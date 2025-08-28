import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Dish } from '../../models/dish.model';

@Component({
  selector: 'app-dish-discount',
  imports: [FormsModule],
  templateUrl: './dish-discount.html',
  styleUrl: './dish-discount.scss',
})
export class DishDiscount {
  // TODO: Fetch this list from API (DishApi)
  protected dishes = signal<Dish[]>([
    {
      id: 1,
      name: 'Pizza Margherita',
      price: 10,
      available: true,
      category: 'Italien',
      discount: { minQuantity: 3, percentage: 0.1 },
    },
    {
      id: 2,
      name: 'Sushi',
      price: 15,
      available: true,
      category: 'Japonais',
      discount: null,
    },
  ]);

  protected selectedDishId = signal<number | null>(null);

  // TODO: Update the unit price when the selected dish changed
  protected selectedDishUnitPrice = signal(0);

  protected quantity = signal(0);

  // TODO: Update the discount when there is 
  // a discount concerning the selected dish
  // and the current quantity is greater or equal to 
  // the minimum quantity required to apply the discount
  protected selectedDishDiscount = signal(0);

  // TODO: Update the total price based on the unit price
  // the quantity and the discount applied if any
  protected total = signal(0);

  // TODO: When the selected dish changed
  // reset the value of the quantity to 1 :)

  protected decrementQuantity() {
    this.quantity.update((current) => (current - 1 < 0 ? 0 : current - 1));
  }
  protected incrementQuantity() {
    this.quantity.update((current) => current + 1);
  }
}
