// geolocation-actions.ts
import { createAction, props } from '@ngrx/store';
import { GeolocationModel } from '../../models/geolocation.model';

export const loadGeolocation = createAction('[Geolocation] Load Geolocation');

export const loadGeolocationSuccess = createAction(
  '[Geolocation] Load Geolocation Success',
  props<{ geolocation: GeolocationModel }>()
);

export const loadGeolocationFailure = createAction(
  '[Geolocation] Load Geolocation Failure',
  props<{ error: any }>()
);
