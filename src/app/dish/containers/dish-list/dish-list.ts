import { Component,inject } from '@angular/core';
import { DishApi } from '../../services/dish-api';
import { AsyncPipe } from '@angular/common';
import { catchError, debounceTime, finalize, of, startWith, switchMap } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DishCard } from '../../ui/dish-card/dish-card';

@Component({
  selector: 'app-dish-list',
  imports: [DishCard, AsyncPipe, ReactiveFormsModule],
  templateUrl: './dish-list.html',
  styleUrl: './dish-list.scss',
})
export class DishList {
  protected title = 'List of dishes';

  protected dishApiService = inject(DishApi);

  protected searchInput = new FormControl<string | null>(null);

  protected loading = false;
  protected hasError = false;
  protected errorMessage = 'An error occurred while loading data.';

  private searchInputChanged$ = this.searchInput.valueChanges.pipe(
    debounceTime(300),
    takeUntilDestroyed(),
    startWith(null),
  );

  // TODO: implement the search feature using rxResource
  protected dishes$ = this.searchInputChanged$.pipe(
    switchMap((searchValue) => {
      this.loading = true;
      this.hasError = false;
      return this.dishApiService.getDishes(searchValue).pipe(
        catchError((error) => {
          // do something with the error
          console.error(error);
          this.hasError = true;
          return of([]);
        }),
        finalize(() => {
          this.loading = false;
        }),
      );
    }),
  );

  protected onDeleteDish(dishId: number) {
    this.dishApiService.deleteDish(dishId).subscribe(()=> {
      // TODO: refresh the list after deleting a dish 
    })
  }
}
