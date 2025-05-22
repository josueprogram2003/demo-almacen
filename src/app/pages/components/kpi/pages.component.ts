import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { lastValueFrom } from 'rxjs';
import { changepreLoader, RootReducerState } from '../../../utils';

@Component({
  selector: 'app-pages',
  template: `
    <!-- <button  (click)="redirect()" >Redirect</button> -->
    <router-outlet></router-outlet>
  `,
})
export class PagesComponent implements OnInit {
  title = 'mf-kpi';
  constructor(private router: Router, private store: Store<RootReducerState>) {}
  async ngOnInit() {
    this.store.dispatch(changepreLoader({ preLoader: 'disable' }));
  }
  redirect() {
    this.router.navigate(['/kpi']);
  }
}
