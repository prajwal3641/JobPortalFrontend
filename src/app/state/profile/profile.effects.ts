import {
  catchError,
  concatMap,
  map,
  Observable,
  of,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs';
import {
  ProfileActions,
  profileFeature,
  selectProfileData,
} from './profile.feature';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProfileService } from '../../Services/profile.service';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';

@Injectable()
export class ProfileEffects {
  addCertification$;
  addExperience$;

  updateProfile$;

  constructor(
    private actions$: Actions,
    private store: Store,
    private profileService: ProfileService
  ) {
    this.addCertification$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(ProfileActions.addCertificationRequest),
        withLatestFrom(this.store.select(profileFeature.selectProfileData)),
        switchMap(([action, profileData]) => {
          if (!profileData) {
            return of(
              ProfileActions.addCertificationError({
                error: 'Profile data not found.',
              })
            );
          }

          const updatedProfile = {
            ...profileData,
            certification: [
              ...profileData.certification,
              action.certificationObject,
            ],
          };

          return this.profileService.updateProfile(updatedProfile).pipe(
            map((response) => {
              return ProfileActions.addCertificationSuccess({
                updatedProfile: response,
              });
            }),
            catchError((error) => {
              const message =
                error.status === 0
                  ? 'Backend server is unreachable.'
                  : error.error?.errorMessage || 'An error occurreds.';
              return of(
                ProfileActions.addCertificationError({
                  error: message,
                })
              );
            })
          );
        })
      );
    });

    this.addExperience$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(ProfileActions.addExperienceRequest),
        withLatestFrom(this.store.select(selectProfileData)),
        switchMap(([action, profile]) => {
          if (!profile) {
            return of(
              ProfileActions.addExperienceFailure({
                error: 'Profile Not Found',
              })
            );
          }

          const updatedProfile = {
            ...profile,
            experience: [action.experienceObject, ...profile.experience],
          };

          return this.profileService.updateProfile(updatedProfile).pipe(
            map((res) =>
              ProfileActions.addExperienceSuccess({ updatedProfile: res })
            ),

            catchError((err) => {
              const message =
                err.status === 0
                  ? 'Backend server is unreachable.'
                  : err.error?.errorMessage || 'An error occurreds.';
              return of(
                ProfileActions.addExperienceFailure({
                  error: message,
                })
              );
            })
          );
        })
      );
    });

    this.updateProfile$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(ProfileActions.updateProfileRequest),
        switchMap((action) =>
          this.profileService.updateProfile(action.updatedProfile).pipe(
            map((response) =>
              ProfileActions.updateProfileSuccess({ updatedProfile: response })
            ),
            catchError((error) => {
              const message =
                error.status === 0
                  ? 'Backend server is unreachable.'
                  : error.error?.errorMessage || 'An error occurred.';
              return of(ProfileActions.updateProfileError({ error: message }));
            })
          )
        )
      );
    });
  }
}

// export { ProfileEffects }; // ✅ this is what makes it a module
