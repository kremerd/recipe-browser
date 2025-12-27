import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { form } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

type OnChangeCallback = (value: string[]) => void;
type OnTouchedCallback = () => void;

@Component({
  selector: 'rec-tag-input',
  imports: [MatButtonModule, MatFormFieldModule, MatChipsModule, MatIconModule],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: TagInputComponent },
  ],
  templateUrl: './tag-input.html',
  styleUrl: './tag-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagInputComponent implements ControlValueAccessor {
  private readonly element: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly announcer = inject(LiveAnnouncer);

  private onChangeCallback?: OnChangeCallback;
  private onTouchedCallback?: OnTouchedCallback;
  readonly tags = form<string[]>(signal([]));
  readonly ENTER = 13;
  readonly SPACE = 32;

  writeValue(obj: string[]): void {
    this.tags().value.set(obj);
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
      this.tags().value.update((tags) => [
        ...tags.filter((t) => t !== tag),
        tag,
      ]);
      this.onChangeCallback?.(this.tags().value());
      this.announcer.announce(`Tag ${tag} eingefügt.`);
    }

    event.chipInput?.clear();
  }

  removeTag(tag: string): void {
    this.tags().value.update((tags) => {
      const index = tags.indexOf(tag);
      if (index < 0) {
        return tags;
      }

      tags.splice(index, 1);
      this.announcer.announce(`Tag ${tag} entfernt.`);
      return [...tags];
    });
    this.onChangeCallback?.(this.tags().value());
  }
}
