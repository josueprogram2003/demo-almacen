import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DataInitial } from "../../models/dataInitial.model";

export const getDataInitial = createFeatureSelector<DataInitial>('dataInitial');

export const getDataInitialState = createSelector(
    getDataInitial,
    (state: DataInitial) => state.person
)