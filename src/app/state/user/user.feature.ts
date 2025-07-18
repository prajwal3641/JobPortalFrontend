import { inject } from '@angular/core';
import { createFeature, createReducer, on } from '@ngrx/store';
import { createAction, props } from '@ngrx/store';
import { LocalStorageService } from '../../Services/local-storage.service';

// The shape of your user data
export interface UserProfile {
  id: number;
  name: string;
  email: string;
  accountType: string;
  profileId: number;
}

// The shape of this state "slice"
export interface UserState {
  profile: UserProfile | null;
}

export const initialState: UserState = {
  profile: null,
};

// --- ACTIONS ---
// These are the actions your components and effects will dispatch.
export const UserActions = {
  // Action for rehydrating state from localStorage
  rehydrateState: createAction(
    '[App Component] Rehydrate State',
    props<{ userObject: UserProfile }>()
  ),

  // Action for the component to dispatch on login form submit
  loginSubmitted: createAction(
    '[Login Component] Login Submitted',
    props<{ userObject: UserProfile }>()
  ),

  // Action for the component to dispatch on logout button click
  logoutSubmitted: createAction('[Header Component] Logout Submitted'),
};

// --- REDUCER ---
// This is where your setUser and removeUser logic lives. Notice it has no service calls.
export const userFeature = createFeature({
  name: 'user',
  reducer: createReducer(
    initialState,

    // When rehydrateState occurs, this reducer updates the state with the new user.
    on(UserActions.rehydrateState, (state, { userObject }) => ({
      ...state,
      profile: userObject,
    })),

    // The 'setUser' logic:
    // When loginSubmitted occurs, this reducer updates the state with the new profile.
    on(UserActions.loginSubmitted, (state, { userObject }) => ({
      ...state,
      profile: userObject,
    })),

    // The 'removeUser' logic:
    // When logoutSubmitted occurs, this reducer resets the state to its initial value.
    on(UserActions.logoutSubmitted, (state) => initialState)
  ),
});

// --- SELECTORS ---
// Helper to read the profile from the store
export const { selectProfile } = userFeature;
