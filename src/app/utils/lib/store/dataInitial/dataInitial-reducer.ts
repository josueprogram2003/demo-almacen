// dataInitial.reducer.ts

import { Action, createReducer, on } from "@ngrx/store";
import { DataInitial } from "../../models/dataInitial.model";
import { loadDataInitialActionsSuccess, loadDataInitialSuccess } from "./dataInitial-actions";


export interface DataInitialState{
    data: DataInitial,
}
export const  initialDataInitialState: DataInitialState = {
    data:{}
};
export const dataInitialReducer = createReducer(
    initialDataInitialState,
    on(loadDataInitialSuccess,(state, {userDataInitial})=>({
        ...state,
        data: userDataInitial,
    })),
    on(loadDataInitialActionsSuccess, (state, { actions }) => ({
    ...state,
    data: {
      ...state.data,
      acciones: actions
    }
  })),
)
export function reducerDatatInitial(state: DataInitialState |  undefined, action: Action) {
  return dataInitialReducer(state, action);
}