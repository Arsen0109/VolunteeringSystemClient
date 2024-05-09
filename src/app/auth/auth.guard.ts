import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "./shared/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  if(inject(AuthService).isLoggedIn()){
    return true
  } else {
    inject(Router).navigateByUrl("/login")
  }
  return true
};
