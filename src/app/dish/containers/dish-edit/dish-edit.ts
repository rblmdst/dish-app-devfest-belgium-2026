import {
  Component,
  computed,
  inject,
  input,
  numberAttribute,
} from '@angular/core';
import { CATEGORIES } from '../../../const';
import { DISH_API_BASE_URL, DishApi } from '../../services/dish-api';
import { Dish } from '../../models/dish.model';
import { Router } from '@angular/router';
import { DishForm } from '../../ui/dish-form/dish-form';
import { rxResource } from '@angular/core/rxjs-interop';
import { httpResource } from '@angular/common/http';
import { DishDto } from '../../models/dtos/dish.model';

@Component({
  selector: 'app-dish-edit',
  imports: [DishForm],
  templateUrl: './dish-edit.html',
  styleUrl: './dish-edit.scss',
})
export class DishEdit {
  private dishApiService = inject(DishApi);
  private router = inject(Router);

  protected readonly categories = CATEGORIES;
  protected readonly dishId = input.required({ transform: numberAttribute });
  protected readonly errorMsg = 'An error occurred while loading data.';

  // TODO: instead of rxResource use httpResource to fetch the Dish
  /* protected dishRx = rxResource({
    params: () => this.dishId(),
    stream: ({ params: dishId }) => this.dishApiService.getDish(dishId),
  }); */

  protected dishRx = httpResource<null|DishDto>(()=> `${DISH_API_BASE_URL}/${this.dishId()}`, {defaultValue: null}  )

  protected onEditDish(dish: Dish) {
    this.dishApiService.updateDish(dish.id, dish).subscribe({
      next: () => {
        alert('Dish updated successfully !!');
        this.router.navigate(['/dishes']);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
