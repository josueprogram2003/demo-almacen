import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StateSimple } from './state-reducers';

export const getStateSimple =
  createFeatureSelector<StateSimple>('state');
export const getCompanyState = createSelector(
  getStateSimple,
  (state: StateSimple) => state.redirect
);
