import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
{
  path: 'list',
  loadChildren: () => import('./accounting-list/accounting-list.module').then(m => m.AccountingListModule)
},
{
  path: 'subdiary',
  loadChildren: () => import('./subdiary/subdiary.module').then(m => m.SubdiaryModule)
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountingEntryRoutingModule { }
