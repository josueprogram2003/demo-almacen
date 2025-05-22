import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ApplicationState } from './application-reducers';

export const getApplication =
  createFeatureSelector<ApplicationState>('application');
export const getCompanyState = createSelector(
  getApplication,
  (state: ApplicationState) => state.company
);
export const getMenuState = createSelector(
  getApplication,
  (state: ApplicationState) => state.menuActive
);
