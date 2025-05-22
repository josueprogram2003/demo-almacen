// user.actions.ts
import { createAction, props } from '@ngrx/store';
import { Aplicacion } from '../../models/application.model';

export const loadUserModules = createAction(
  '[User] Load User Modules Success',
  props<{ modules: Aplicacion[] }>()
);
