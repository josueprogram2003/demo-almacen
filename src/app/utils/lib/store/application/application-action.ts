import { createAction, props } from '@ngrx/store';
import { Company } from '../../models/company.model';

export const loadApplicationActive = createAction(
  '[User] Load Menu Active Success',
  props<{ menuActive: number | string, nameModule:string }>()
);

export const loadName = createAction(
  '[User] Load Name of Module Active Success',
  props<{  nameModule:string }>()
);


export const loadCompanyActive = createAction(
  '[User] Load Company Active Success',
  props<{ company: Company }>()
);
