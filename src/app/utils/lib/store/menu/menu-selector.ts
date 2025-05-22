import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MenuState } from './menu-reducer';


export const getMenu= createFeatureSelector<MenuState>('menu');
export const getMenuState = createSelector(
    getMenu,
    (state: MenuState) => state.content
  );