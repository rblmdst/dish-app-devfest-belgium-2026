import { Routes } from '@angular/router';
import { DishDiscount } from './dish/containers/dish-discount/dish-discount';
import { DishEdit } from './dish/containers/dish-edit/dish-edit';
import { DishList } from './dish/containers/dish-list/dish-list';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dishes' },
  {
    path: 'dishes',
    children: [
      { path: '', component: DishList, title: 'List of dishes' },
      {
        path: 'edit/:dishId',
        component: DishEdit,
        title: 'Update dish',
      },
      {
        path: 'discount',
        component: DishDiscount,
        title: 'Discounts check',
      },
    ],
  },
];