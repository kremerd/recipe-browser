import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Ingredient } from '../../../service';

type OnChangeCallback = (value: Ingredient) => void;
type OnTouchedCallback = () => void;

@Component({
  selector: 'rec-ingredient-input',
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => IngredientInput),
    },
  ],
  templateUrl: './ingredient-input.html',
  styleUrl: './ingredient-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientInput implements ControlValueAccessor {
  private readonly element: ElementRef<HTMLElement> = inject(ElementRef);

  private onChangeCallback?: OnChangeCallback;
  private onTouchedCallback?: OnTouchedCallback;
  readonly value = signal<Ingredient>({
    amount: 0,
    unit: '',
    name: '',
  });

  writeValue(ingredient: Ingredient): void {
    this.value.set(ingredient);
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

  updateConsumer(): void {
    this.onChangeCallback?.(this.value());
  }
}
