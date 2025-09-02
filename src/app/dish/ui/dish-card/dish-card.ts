import { Component, output, input } from '@angular/core';
import { Dish } from '../../models/dish.model';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-dish-card',
  imports: [RouterLink],
  templateUrl: './dish-card.html',
  styleUrl: './dish-card.scss',
})
export class DishCard {
  readonly dish = input.required<Dish>();
  readonly delete = output<number>();

  protected onDelete(dish: Dish) {
    const userConfirmedDelete = confirm(
      `Do you really want to delete the dish "${dish.name}" ?`
    );

    if (userConfirmedDelete) {
      this.delete.emit(dish.id);
    }
  }
}
