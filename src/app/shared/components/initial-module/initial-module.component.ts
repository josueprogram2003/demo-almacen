import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { data } from './acces.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { getUserProfiles, Perfil, RootReducerState } from '../../../utils';

@Component({
  selector: 'initial-module',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './initial-module.component.html',
  styleUrl: './initial-module.component.scss',
})
export class InitialModuleComponent implements OnInit {
  profiles: Perfil[] = [];
  access: any;
  constructor(private router: Router, private activeRouter: ActivatedRoute, private store:Store<RootReducerState>) {}
  ngOnInit() {
    this.activeRouter.data.subscribe((x) => {
      this.store.select(getUserProfiles).subscribe((data:any) => {
        this.profiles = data;
      })
      this.access = data.find((item) => item.value === x['value']);
    })
  }
   navigateToAccess(url:string) {
    this.router.navigate([url]);
  }
}
