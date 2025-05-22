import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ModuleState } from './module-reducer';


export const getModules= createFeatureSelector<ModuleState>('module');
export const getModulesState = createSelector(
    getModules,
    (state: ModuleState) => state.content
  );
