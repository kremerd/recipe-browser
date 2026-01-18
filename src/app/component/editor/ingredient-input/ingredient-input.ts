import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  model,
} from '@angular/core';
import { form, FormField, FormValueControl } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Ingredient } from '../../../service';

@Component({
  selector: 'rec-ingredient-input',
  imports: [
    FormField,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './ingredient-input.html',
  styleUrl: './ingredient-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientInputComponent implements FormValueControl<Ingredient> {
  private readonly element: ElementRef<HTMLElement> = inject(ElementRef);

  readonly value = model<Ingredient>({
    amount: 0,
    unit: '',
    name: '',
  });
  readonly touched = model<boolean>(false);

  readonly formValue = form(this.value);

  @HostListener('focusout', ['$event'])
  focusout(event: FocusEvent): void {
    if (
      event.relatedTarget instanceof Node &&
      !this.element.nativeElement.contains(event.relatedTarget)
    ) {
      this.touched.set(true);
    }
  }
}
