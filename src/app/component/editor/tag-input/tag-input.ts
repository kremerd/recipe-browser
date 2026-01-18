import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  model,
} from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'rec-tag-input',
  imports: [MatButtonModule, MatFormFieldModule, MatChipsModule, MatIconModule],
  templateUrl: './tag-input.html',
  styleUrl: './tag-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagInputComponent implements FormValueControl<string[]> {
  private readonly element: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly announcer = inject(LiveAnnouncer);

  value = model<string[]>([]);
  touched = model<boolean>(false);

  readonly ENTER = 13;
  readonly SPACE = 32;

  @HostListener('focusout', ['$event'])
  focusout(event: FocusEvent): void {
    if (
      event.relatedTarget instanceof Node &&
      !this.element.nativeElement.contains(event.relatedTarget)
    ) {
      this.touched.set(true);
    }
  }

  addTag(event: MatChipInputEvent): void {
    const tag = (event.value ?? '').trim();

    if (tag) {
      this.value.update((tags) => [...tags.filter((t) => t !== tag), tag]);
      this.announcer.announce(`Tag ${tag} eingefügt.`);
    }

    event.chipInput?.clear();
  }

  removeTag(tag: string): void {
    this.value.update((tags) => {
      const index = tags.indexOf(tag);
      if (index < 0) {
        return tags;
      }

      tags.splice(index, 1);
      this.announcer.announce(`Tag ${tag} entfernt.`);
      return [...tags];
    });
  }
}
