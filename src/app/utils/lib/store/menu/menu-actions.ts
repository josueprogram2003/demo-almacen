import { createAction, props } from '@ngrx/store';
import { MenuItem } from '../../models/application.model';

export const loadUserMenu = createAction(
  '[User] Load User Menu Success',
  props<{ menu: MenuItem[] }>()
);
