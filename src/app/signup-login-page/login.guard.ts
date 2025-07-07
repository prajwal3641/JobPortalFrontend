import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { map, take } from 'rxjs';
import { selectProfile } from '../state/user/user.feature';

export const redirectIfLoggedInGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectProfile).pipe(
    take(1),
    map((profile) => {
      if (profile) {
        router.navigate(['/']);
        return false;
      }
      return true;
    })
  );
};
