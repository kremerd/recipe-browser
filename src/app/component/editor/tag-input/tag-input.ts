import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

type OnChangeCallback = (value: string[]) => void;
type OnTouchedCallback = () => void;

@Component({
  selector: 'rec-tag-input',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: TagInput },
  ],
  templateUrl: './tag-input.html',
  styleUrl: './tag-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagInput implements ControlValueAccessor {
  private readonly element: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly announcer = inject(LiveAnnouncer);

  private onChangeCallback?: OnChangeCallback;
  private onTouchedCallback?: OnTouchedCallback;
  readonly tags = signal<string[]>([]);

  writeValue(obj: string[]): void {
    this.tags.set(obj);
  }

  registerOnChange(onChangeCallback: OnChangeCallback): void {
    this.onChangeCallback = onChangeCallback;
  }

  registerOnTouched(onTouchedCallback: OnTouchedCallback): void {
    this.onTouchedCallback = onTouchedCallback;
  }

  @HostListener('focusout', ['$event'])
  focusout(event: FocusEvent): void {
    if (
      event.relatedTarget instanceof Node &&
      !this.element.nativeElement.contains(event.relatedTarget)
    ) {
      this.onTouchedCallback?.();
    }
  }

  addTag(event: MatChipInputEvent): void {
    const tag = (event.value ?? '').trim();

    if (tag) {
      this.tags.update((tags) => [...tags.filter((t) => t !== tag), tag]);
      this.onChangeCallback?.(this.tags());
      this.announcer.announce(`Tag ${tag} eingefügt.`);
    }

    event.chipInput?.clear();
  }

  removeTag(tag: string): void {
    this.tags.update((tags) => {
      const index = tags.indexOf(tag);
      if (index < 0) {
        return tags;
      }

      tags.splice(index, 1);
      this.announcer.announce(`Tag ${tag} entfernt.`);
      return [...tags];
    });
    this.onChangeCallback?.(this.tags());
  }
}
