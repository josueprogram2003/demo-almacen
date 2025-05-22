import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GeolocationState } from './module-reducer';


export const getGeolocation= createFeatureSelector<GeolocationState>('geolocation');
export const geteolocationState = createSelector(
  getGeolocation,
    (state: GeolocationState) => state.content
  );
