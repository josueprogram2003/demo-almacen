// user.reducer.ts
import { Action, createReducer, on } from '@ngrx/store';
import { loadUserMenu } from './menu-actions';
import { MenuItem } from '../../models/application.model';
export interface MenuState {
    content: MenuItem[] ;
  }
  
export const initialMenuState: MenuState = {
  content: []
};

export const menuReducer = createReducer(
  initialMenuState,
  on(loadUserMenu, (state, { menu }) => ({
    ...state,
    content: menu,
  }))
);

export function reducerMenu(state: MenuState | undefined, action: Action) {
  return menuReducer(state, action);
}
