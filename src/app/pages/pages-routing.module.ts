import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { InitialModuleComponent } from '../shared/components/initial-module/initial-module.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'asset',
        loadChildren: () =>
          import('./components/activo/activo.module').then(
            (m) => m.ActivoModule
          ),
      },
      {
        path: 'kpi',
        loadChildren: () =>
          import('./components/kpi/pages.module').then(
            (m) => m.PagesModule
          ),
      },
      {
        path: 'config',
        loadChildren: () =>
          import('./components/configuracion/configuracion.module').then(
            (m) => m.ConfiguracionModule
          ),
      },
      {
        path: 'accounting-entry',
        loadChildren: () =>
          import('./components/accounting-entry/accounting-entry.module').then(
            (m) => m.AccountingEntryModule
          ),
      },
      {
        path: '',
        component: InitialModuleComponent,
        data: {
          value: 5,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
