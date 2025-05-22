import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user-reducer';
import { DataInitial } from '../../models/dataInitial.model';


export const getUser = createFeatureSelector<UserState>('user');
export const getUserState = createSelector(
    getUser,
    (state: UserState) => state.data
  );
  export const getUserAccions = createSelector(
    getUser,
    (state: UserState) => state.data.acciones
  );
  export const getUserProfiles = createSelector(
    getUser,
    (state: UserState) => state.data.perfiles
  );