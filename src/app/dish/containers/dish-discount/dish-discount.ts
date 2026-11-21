import { Component, computed, linkedSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Dish } from '../../models/dish.model';
import { httpResource } from '@angular/common/http';
import { DISH_API_BASE_URL } from '../../services/dish-api';

const toTwoDecimal = (number: number) => parseFloat(number.toFixed(2));

/* Returns the discount amount of a dish based on the quantity. */
const getDishDiscountAmount = (dish: Dish, quantity: number) => {
  const { discount, price } = dish;
  if (discount) {
    const { minQuantity, percentage } = discount;
    if (quantity >= minQuantity) {
      const discount = toTwoDecimal(price * quantity * percentage);
      return discount;
    }
  }
  return 0;
};

@Component({
  selector: 'app-dish-discount',
  imports: [FormsModule],
  templateUrl: './dish-discount.html',
  styleUrl: './dish-discount.scss',
})
export class DishDiscount {
  protected dishesRx = httpResource<Dish[]>(() => DISH_API_BASE_URL, { defaultValue: [] });
  protected dishes = this.dishesRx.value;

  protected selectedDishId = signal<number | null>(null);
  protected selectedDish = computed(() => {
    const selectedDishId = this.selectedDishId();
    const dish = this.dishes().find((dish) => dish.id == selectedDishId);
    return dish;
  });

  // TODO: Update the unit price when the selected dish changed
  protected selectedDishUnitPrice = computed(()=> {
    const dish = this.selectedDish()
    return dish ? dish.price : 0
  });

  protected quantity = linkedSignal<number>(()=> {
    const dishId = this.selectedDishId();
    return dishId ? 1 : 0;
  });

  // TODO: Update the discount when there is
  // a discount concerning the selected dish.
  // HINT : use the function
  // getDishDiscountAmount(dish, quantity)
  protected selectedDishDiscount = computed(()=> {
     const dish = this.selectedDish()
    return dish ? getDishDiscountAmount(dish, this.quantity()) : 0
  });

  // TODO: Update the total price based on the unit price
  // the quantity and the discount applied if any
  // HINT : total = (unitPrice * quantity )- discountAmount
  protected total = computed(()=> {
    const total = (this.selectedDishUnitPrice() * this.quantity() )- this.selectedDishDiscount()
    return total;
  });

  // TODO: When the selected dish changed
  // reset the value of the quantity to 1 :)

  protected decrementQuantity() {
    this.quantity.update((current) => (current - 1 < 0 ? 0 : current - 1));
  }
  protected incrementQuantity() {
    this.quantity.update((current) => current + 1);
  }
}
