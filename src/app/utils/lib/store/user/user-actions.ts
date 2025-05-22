// user.actions.ts
import { createAction, props } from '@ngrx/store';
import { Accion, Perfil, Person, User } from '../../models/user.model';

export const loadUserDataSuccess = createAction(
  '[User] Load User Data Success',
  props<{ userData: User }>()
);
export const loadUserActionsSuccess = createAction(
  '[User] Load User Actions Success',
  props<{ actions: Accion[] }>()
);
export const loadUserProfilesSuccess = createAction(
  '[User] Load User Profiles Success',
  props<{ profiles: Perfil[] }>()
);
export const loadUserId = createAction(
  '[User] Load User Id',
  props<{ employeeId: string, personUserId: string, person: Person }>()
);