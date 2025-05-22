import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AccessGuard: CanActivateFn = (route, state) => {
  const auth:any = route.data
  // console.log(auth);
  const router = inject(Router);
  if(auth.id){
    return true;
  }else{
    router.navigate(['./gth/config/employee'])
    return false;
  }
};
