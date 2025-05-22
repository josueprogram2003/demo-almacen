// user.reducer.ts
import { Action, createReducer, on } from '@ngrx/store';
import { loadUserActionsSuccess, loadUserDataSuccess, loadUserId, loadUserProfilesSuccess } from './user-actions';
import { User } from '../../models/user.model';

export interface UserState {
  data: User ;
}

export const initialUserState: UserState = {
  data: {},
};
export const userReducer = createReducer(
  initialUserState,
  on(loadUserDataSuccess, (state, { userData }) => ({
    ...state,
    data: userData,
  })),
  on(loadUserActionsSuccess, (state, { actions }) => ({
    ...state,
    data: {
      ...state.data,
      acciones: actions
    }
  })),
  on(loadUserProfilesSuccess, (state, { profiles }) => ({
    ...state,
    data: {
      ...state.data,
      perfiles: profiles
    }
  })),
  on(loadUserId, (state, { employeeId,personUserId,person }) => ({
    ...state,
    data: {
      ...state.data,
      employeeId:employeeId,
      personUserId:personUserId,
      person:person
    }
  }))
);

export function reducerUser(state: UserState | undefined, action: Action) {
  return userReducer(state, action);
}
