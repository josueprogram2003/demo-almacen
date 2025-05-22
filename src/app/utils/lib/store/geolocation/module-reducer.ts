// user.reducer.ts
import { Action, createReducer, on } from '@ngrx/store';
import { GeolocationModel } from '../../models/geolocation.model';
import { loadGeolocation, loadGeolocationSuccess, loadGeolocationFailure } from './geolocation-actions';

export interface GeolocationState {
  content: GeolocationModel;
  error: any;
  loading: boolean;
}

export const initialModuleState: GeolocationState = {
  content: {},
  error: null,
  loading: false,
};

export const geolocationReducer = createReducer(
  initialModuleState,
  on(loadGeolocation, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadGeolocationSuccess, (state, { geolocation }) => ({
    ...state,
    content: geolocation,
    loading: false,
  })),
  on(loadGeolocationFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  }))
);

export function reducerGeolocation(state: GeolocationState | undefined, action: Action) {
  return geolocationReducer(state, action);
}
