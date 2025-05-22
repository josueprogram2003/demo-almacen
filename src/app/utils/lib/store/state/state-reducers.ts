// user.reducer.ts
import { Action, createReducer, on } from '@ngrx/store';
import { loadRedirect } from './state-action';
export interface StateSimple {
  redirect:boolean;
  }

export const initialApplication: StateSimple = {
  redirect:false
};

export const stateReducer = createReducer(
  initialApplication,
  on(loadRedirect, (state, action) => ({
    ...state,
   redirect: action.redirect
  }))
);

export function reducerState(state: StateSimple | undefined, action: Action) {
  return stateReducer(state, action);
}
