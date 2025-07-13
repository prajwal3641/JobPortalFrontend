import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withRouterConfig,
} from '@angular/router';

import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { userFeature } from './state/user/user.feature';
import { UserEffects } from './state/user/user.effects';
import { profileFeature } from './state/profile/profile.feature';
import { ProfileService } from './Services/profile.service';
import { ProfileEffects } from './state/profile/profile.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withRouterConfig({
        paramsInheritanceStrategy: 'always',
      }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
      })
    ),
    provideAnimations(),
    provideHttpClient(),
    // register each feature exactly once:
    provideState(userFeature),
    provideState(profileFeature),
    provideStore(),

    // register your effects
    provideEffects([UserEffects, ProfileEffects]),
  ],
};
