import {
  Component,
  inject,
  input,
  OnChanges,
  output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Dish } from '../../models/dish.model';

export type EditDishData = {
  id: number;
  name: string;
  category: string;
  price: number;
  available: boolean;
};

@Component({
  selector: 'app-dish-form',
  imports: [ReactiveFormsModule],
  templateUrl: './dish-form.html',
  styleUrl: './dish-form.scss',
})
export class DishForm implements OnChanges {
  readonly addDish = output<Omit<Dish, 'id'>>();
  readonly editDish = output<Dish>();

  readonly dish = input<Dish | null>(null);
  readonly categories = input<string[]>([]);

  protected isEdit = false;
  private fb = inject(FormBuilder);

  protected form = this.fb.nonNullable.group({
    id: this.fb.control<number | null>(null),
    name: ['', [Validators.required, Validators.maxLength(30)]],
    category: ['', Validators.required],
    price: [0, Validators.required],
    available: [false, Validators.required],
  });

  ngOnChanges(changes: SimpleChanges): void {
    if ('dish' in changes) {
      this.isEdit = true;
      const dish = this.dish();
      if (dish) {
        this.form.setValue(dish);
      } else {
        this.form.reset();
      }
    }
  }
  protected onSubmit() {
    const { id, name, category, price, available } = this.form.value;
    if (this.isEdit) {
      const updatedDish = { id, name, category, price, available } as Dish;
      this.editDish.emit(updatedDish);
    } else {
      const newDish = { name, category, price, available } as Omit<Dish, 'id'>;
      this.addDish.emit(newDish);
    }
  }
}
