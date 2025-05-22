// user.reducer.ts
import { Action, createReducer, on } from '@ngrx/store';
import { loadUserModules } from './module-actions';
import { Aplicacion } from '../../models/application.model';


export interface ModuleState {
    content: Aplicacion[] ;
  }

export const initialModuleState: ModuleState = {
  content: [],
};

export const moduleReducer = createReducer(
  initialModuleState,
  on(loadUserModules, (state, { modules }) => ({
    ...state,
    content: modules,
  })),

);

export function reducerModule(state: ModuleState | undefined, action: Action) {
  return moduleReducer(state, action);
}
