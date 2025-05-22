import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { changepreLoader, RootReducerState } from '../utils';

@Component({
  selector: 'app-pages',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: ``
})
export class PagesComponent {
  constructor(private router:Router , private store: Store<RootReducerState>){}
  ngOnInit(): void {
    this.store.dispatch(changepreLoader({ preLoader: 'disable' }));
  }
}
