import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentMainComponent } from './components/content-main/content-main.component';

const routes: Routes = [
  {
    path:'',
    component:ContentMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepreciationEntryRoutingModule { }
