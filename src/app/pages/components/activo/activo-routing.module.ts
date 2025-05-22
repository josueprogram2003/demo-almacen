import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Access } from '../../../core/guard/access';
import { SessionAliveUtilGuard } from '../../../utils';

const routes: Routes = [
  {
    path: 'initial',
    loadChildren: () => import("./components/asset/asset.module").then((m) => m.AssetModule),
    canActivate: [SessionAliveUtilGuard],
    data: { code: Access.assetList.cod }
  },
  {
    path: 'assignment',
    loadChildren: () => import("./components/assignment/assignment.module").then((m) => m.AssignmentModule),
    canActivate: [SessionAliveUtilGuard],
    data: { code: Access.assetAssignment.cod }
  },
  {
    path: 'depreciation',
    loadChildren: () => import("./components/depreciation-entry/depreciation-entry.module").then((m) => m.DepreciationEntryModule),
    canActivate: [SessionAliveUtilGuard],
    data: { code: Access.assetDeprecation.cod }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivoRoutingModule { }
