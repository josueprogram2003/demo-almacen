import { createAction, props } from "@ngrx/store";
import { DataInitial } from "../../models/dataInitial.model";
import { Accion } from "../../models/user.model";


export const loadDataInitialSuccess = createAction(
  '[DataInitial] Load User Data Success',
  props<{ userDataInitial: DataInitial }>()
)
export const loadDataInitialActionsSuccess = createAction(
  '[User] Load data Initial Actions Success',
  props<{ actions: Accion[] }>()
);