import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { SessionAliveUtilGuard } from '../../../utils';
import { InitialModuleComponent } from '../../../shared/components/initial-module/initial-module.component';
import { Access } from './core/guard/access';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'settings',
        loadChildren: () => import("./setting/setting.module").then((m) => m.SettingModule),
        canActivate: [SessionAliveUtilGuard],
        data: { code: Access.configuration.cod }
      }, {
        path: 'reports',
        loadChildren: () => import("./reports/reports.module").then((m) => m.ReportsModule),
        canActivate: [SessionAliveUtilGuard],
        data: { code: Access.reports.cod }
      },
      {
        path: '',
        component: InitialModuleComponent,
        data: {
          value: 4
        }
      }

    ]
  }
];

@NgModule({
  declarations: [PagesComponent],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
