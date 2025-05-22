import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { MenuItem } from "../models/application.model";
import { Store } from "@ngrx/store";
import { getMenuState } from "../store/menu/menu-selector";
import { filter, lastValueFrom, take } from "rxjs";

export const SessionAliveUtilGuard: CanActivateFn = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const store =  inject(Store);
  let menu:MenuItem[] = [];
  store.select(getMenuState).pipe(take(1),filter(menu=>menu.length>0)).subscribe((data) => {
    menu = data;
    const access = findOption(route.data['code'], menu)
    if(access.length==0) {
      router.navigate(['error/403']);
      return false;
    }else
      return true;
  });

  return true
};

export function findOption(codigo: string, target: MenuItem[], found: MenuItem[] = []) {
  for (const val of target) {
    if (val.code === codigo) {
      found.push(val);
    } else if (val.subItems && val.subItems.length !== 0) {
      findOption(codigo, val.subItems, found);
    }
  }
  return found;
}
