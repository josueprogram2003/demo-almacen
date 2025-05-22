import { ActionReducerMap } from '@ngrx/store';
import { LayoutState, layoutReducer } from './layouts/layout-reducers';
import { UserState, userReducer } from './user/user-reducer';
import { ModuleState, moduleReducer } from './module/module-reducer';
import { MenuState, menuReducer } from './menu/menu-reducer';
import { geolocationReducer, GeolocationState } from './geolocation/module-reducer';
import { applicationReducer, ApplicationState } from './application/application-reducers';
import { stateReducer, StateSimple } from './state/state-reducers';
import { dataInitialReducer, DataInitialState } from './dataInitial/dataInitial-reducer';


export interface RootReducerState {
  layout: LayoutState;
  user: UserState;
  module: ModuleState;
  menu: MenuState;
  geolocation: GeolocationState;
  application:ApplicationState;
  state:StateSimple
  dataInitial: DataInitialState,
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
  layout: layoutReducer,
  user: userReducer,
  module: moduleReducer,
  menu: menuReducer,
  geolocation: geolocationReducer,
  application: applicationReducer,
  state: stateReducer,
  dataInitial: dataInitialReducer,
};
