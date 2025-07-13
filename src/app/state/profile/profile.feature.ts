import {
  Action,
  createAction,
  createFeature,
  createReducer,
  on,
  props,
} from '@ngrx/store';

export interface Profile {
  id: number;
  email: string;
  jobTitle: string;
  company: string;
  location: string;
  about: string;
  profileImage: string;
  skills: string[];
  experience: Experience[];
  certification: Certification[];
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  startDate: string; // ISO format e.g. "2022-04-01T00:00:00"
  endDate: string;
  working: boolean;
  description: string;
}

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  issueDate: string; // ISO format e.g. "2023-08-01T00:00:00"
  certificationId: string;
}

export interface ProfileState {
  profileData: Profile | null;
  error: string | null;
  loading: boolean;
}

export const initialState: ProfileState = {
  profileData: null,
  error: null,
  loading: false,
};

export const ProfileActions = {
  changeProfile: createAction(
    '[Profile Component] Change Profile',
    props<{ profileObject: Profile }>()
  ),

  setProfile: createAction(
    '[Profile Component] Set Profile',
    props<{ profileObject: Profile }>()
  ),
  removeProfile: createAction('[Profile Component] Remove Profile'),
  addCertificationRequest: createAction(
    '[Certification-Input Component] Add Certification Request',
    props<{ certificationObject: Certification }>()
  ),
  addCertificationSuccess: createAction(
    '[Certification-Input Component] Add Certification Success',
    props<{ updatedProfile: Profile }>()
  ),
  addCertificationError: createAction(
    '[Certification-Input Component] Add Certification Error',
    props<{ error: string }>()
  ),
  addExperienceRequest: createAction(
    '[Experience-card Component] Add Experience Request',
    props<{ experienceObject: Experience }>()
  ),
  addExperienceSuccess: createAction(
    '[Experience-card Component] Add Experience Success',
    props<{ updatedProfile: Profile }>()
  ),
  addExperienceFailure: createAction(
    '[Experience-card Component] Add Experience Failure',
    props<{ error: string }>()
  ),
};

export const profileFeature = createFeature({
  name: 'profile',
  reducer: createReducer(
    initialState,

    on(ProfileActions.changeProfile, (state, { profileObject }) => ({
      ...state,
      profileData: profileObject,
    })),

    on(ProfileActions.setProfile, (state, { profileObject }) => ({
      ...state,
      profileData: profileObject,
    })),
    on(ProfileActions.removeProfile, (state) => {
      return initialState;
    }),

    // When certification request starts (optional - for loading state)
    on(
      ProfileActions.addCertificationRequest,
      (state, { certificationObject }) => ({
        ...state,
        // Add a loading flag if needed
        loading: true,
        error: null, // Reset any previous error
      })
    ),
    // On success - update state with the profile returned from the API
    on(ProfileActions.addCertificationSuccess, (state, { updatedProfile }) => ({
      ...state,
      profileData: updatedProfile,
      loading: false, // Reset loading state
      error: null, // Reset any previous error
    })),
    // On failure - handle error state
    on(ProfileActions.addCertificationError, (state, { error }) => ({
      ...state,
      loading: false, // Reset loading state
      // You might want to store the error
      error: error || 'An error occurred while adding certification.',
    })),

    on(ProfileActions.addExperienceRequest, (state, { experienceObject }) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(ProfileActions.addExperienceSuccess, (state, { updatedProfile }) => ({
      ...state,
      loading: false,
      error: null,
      profileData: updatedProfile,
    })),
    on(ProfileActions.addExperienceFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error: error || 'An error occurred while adding Experience.',
    }))
  ),
});

export const { selectProfileData, selectError, selectLoading, name } =
  profileFeature;
