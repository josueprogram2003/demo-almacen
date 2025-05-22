import { createAction, props } from '@ngrx/store';


export const loadRedirect= createAction(
  '[User] Load Redirect Active Success',
  props<{ redirect: boolean }>()
);
