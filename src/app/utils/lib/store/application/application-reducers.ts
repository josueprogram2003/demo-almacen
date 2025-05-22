// user.reducer.ts
import { Action, createReducer, on } from '@ngrx/store';
import { Company } from '../../models/company.model';
import { loadApplicationActive, loadCompanyActive, loadName } from './application-action';
export interface ApplicationState {
  menuActive: number | string;
  company:Company;
  nameModule:string;
  }

export const initialApplication: ApplicationState = {
  menuActive: 0,
  company: {},
  nameModule: 'ANT'
};

export const applicationReducer = createReducer(
  initialApplication,
  on(loadApplicationActive, (state, action) => ({
    ...state,
   menuActive: action.menuActive,
   nameModule: action.nameModule
  })),
  on(loadCompanyActive, (state, action) => ({
    ...state,
   company: action.company,
  })),
  on(loadName, (state, action) => ({
    ...state,
   nameModule: action.nameModule
  }))
);

export function reducerApplication(state: ApplicationState | undefined, action: Action) {
  return applicationReducer(state, action);
}
