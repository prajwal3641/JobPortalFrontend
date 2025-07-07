import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { UserActions } from './user.feature';

import { LocalStorageService } from '../../Services/local-storage.service';

@Injectable()
export class UserEffects {
  // 1. Declare the effects properties without initializing them here.
  saveUserToStorage$;
  removeUserFromStorage$;

  constructor(
    private actions$: Actions,
    private localStorageService: LocalStorageService
  ) {
    // 2. Initialize the effects inside the constructor, where we are
    //    guaranteed that 'this.actions

    this.saveUserToStorage$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(UserActions.loginSubmitted),
          tap(({ userObject }) => {
            this.localStorageService.setItem('user', userObject);
          })
        ),
      { dispatch: false }
    );

    this.removeUserFromStorage$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(UserActions.logoutSubmitted),
          tap(() => {
            this.localStorageService.removeItem('user');
          })
        ),
      { dispatch: false }
    );
  }
}
