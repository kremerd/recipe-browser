import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  linkedSignal,
  model,
} from '@angular/core';
import { form, FormField, FormValueControl } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Ingredient } from '../../../service';
import { IngredientParser } from './ingredient-parser';
import { IngredientPrinter } from './ingredient-printer';

@Component({
  selector: 'rec-ingredient-input',
  imports: [
    FormField,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    JsonPipe,
  ],
  templateUrl: './ingredient-input.html',
  styleUrl: './ingredient-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientInputComponent implements FormValueControl<Ingredient> {
  private readonly element: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly ingredientParser = inject(IngredientParser);
  private readonly ingredientPrinter = inject(IngredientPrinter);

  readonly value = model<Ingredient>({
    name: '',
  });
  readonly touched = model<boolean>(false);

  readonly textValue = linkedSignal<string>(() =>
    this.ingredientPrinter.print(this.value()),
  );
  readonly formValue = form(this.textValue);

  change(): void {
    this.value.set(this.ingredientParser.parse(this.textValue()));
    console.log(this.textValue());
  }

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
