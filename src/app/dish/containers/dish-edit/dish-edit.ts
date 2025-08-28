import { Component, inject } from '@angular/core';
import { CATEGORIES } from '../../../const';
import { DishApi } from '../../services/dish-api';
import { Dish } from '../../models/dish.model';
import { Router } from '@angular/router';
import { DishForm } from '../../ui/dish-form/dish-form';

@Component({
  selector: 'app-dish-edit',
  imports: [DishForm],
  templateUrl: './dish-edit.html',
  styleUrl: './dish-edit.scss',
})
export class DishEdit {
  protected categories = CATEGORIES;
  protected errorMsg = 'An error occurred while loading data.';
  protected isLoading = true;

  // TODO: Get from the route (/dishes/edit/<dishId>)
    dishId = null;
  // TODO: fetch from API using id present in route path
  protected dish = null;

  private dishApiService = inject(DishApi);
  private router = inject(Router);

  protected onEditDish(dish: Dish) {
    this.dishApiService.updateDish(dish.id, dish).subscribe({
      next: () => {
        alert('Dish added successfully !!');
        this.router.navigate(['/dishes']);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
