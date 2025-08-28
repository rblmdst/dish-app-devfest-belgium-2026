import { inject, Injectable } from '@angular/core';
import { Dish } from '../models/dish.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DishDto } from '../models/dtos/dish.model';

export const DISH_API_BASE_URL = 'http://localhost:3000/dishes';

@Injectable({
  providedIn: 'root',
})
export class DishApi {
  private http = inject(HttpClient);

  // http://localhost:3000/dishes?name_like=piz
  getDishes(searchValue: string | null) {
    let params = new HttpParams();
    if (searchValue) {
      params = params.append('name_like', searchValue);
    }
    return this.http.get<Dish[]>(DISH_API_BASE_URL, { params });
  }

  getDish(dishId: number) {
    return this.http.get<Dish>(`${DISH_API_BASE_URL}/${dishId}`);
  }

  deleteDish(dishId: number) {
    return this.http.delete<void>(`${DISH_API_BASE_URL}/${dishId}`);
  }

  updateDish(dishId: number, data: DishDto) {
    return this.http.put<Dish>(`${DISH_API_BASE_URL}/${dishId}`, data);
  }
}
