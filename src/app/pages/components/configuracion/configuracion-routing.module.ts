import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Access } from '../../../core/guard/access';
import { SessionAliveUtilGuard } from '../../../utils';

const routes: Routes = [
  {
    path: 'group',
    loadChildren: () => import('./components/group/group.module').then(m => m.GroupModule),
    canActivate: [SessionAliveUtilGuard],
    data: { code: Access.group.cod }
  }, {
    path: 'trademark',
    loadChildren: () => import('./components/mark/mark.module').then(m => m.MarkModule),
    canActivate: [SessionAliveUtilGuard],
    data: { code: Access.brand.cod }
  },{
    path:'category',
    loadChildren: ()=> import('./components/category/category.module').then(m=> m.CategoryModule),
    canActivate: [SessionAliveUtilGuard],
    data: { code: Access.category.cod }
  },
  {
    path:'model',
    loadChildren:()=>import('./components/models/models.module').then(m =>m.ModelsModule),
    canActivate: [SessionAliveUtilGuard],
    data: { code: Access.model.cod }
  },{
    path:'material',
    loadChildren:()=>import('./components/material/material.module').then(m=>m.MaterialModule),
    canActivate: [SessionAliveUtilGuard],
    data: { code: Access.material.cod }
  },{
    path:'account',
    loadChildren:()=>import("./components/account/account.module").then(m=>m.AccountModule),
    canActivate: [SessionAliveUtilGuard],
    data: { code: Access.account.cod }
  },
  {
    path: 'cost',
    loadChildren  : () => import('./components/cost-center/cost-center.module').then(m => m.CostCenterModule),
    canActivate: [SessionAliveUtilGuard],
    data: { code: Access.costCenter.cod },
  },
  {
    path: 'exonerated',
    loadChildren  : () => import('./components/count-accountand-exonerated/count-accountand-exonerated.module').then(m => m.CountAccountandExoneratedModule),
    canActivate: [SessionAliveUtilGuard],
    data: { code: Access.accountExonerated.cod },
  },
  {
    path: 'especial',
    loadChildren  : () => import('./components/count-exonerated-cost-center/count-exonerated-cost-center.module').then(m => m.CountExoneratedCostCenterModule),
    canActivate: [SessionAliveUtilGuard],
    data: { code: Access.accountExoneratedSpecial.cod },
  },
  {
    path: 'user',
    loadChildren  : () => import('./components/cost-center-user/cost-center-user.module').then(m => m.CostCenterUserModule),
    canActivate: [SessionAliveUtilGuard],
    data: { code: Access.userCostCenter.cod },
  },
  {
    path: 'report',
    loadChildren: () => import('./components/report/report.module').then(m => m.ReportModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionRoutingModule { }
