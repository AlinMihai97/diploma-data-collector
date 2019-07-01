import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router/src/utils/preactivation';

@Injectable({
  providedIn: 'root'
})
export class LoadingScreenGuardGuard implements CanActivate {

  path: ActivatedRouteSnapshot[]; route: ActivatedRouteSnapshot;

  apiVerified: boolean
  
  constructor() {
    console.log("API VERIFY GUARD CONSTRUCTOR")
    this.apiVerified = false
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let oldValue = this.apiVerified
    this.apiVerified = true
    return !oldValue;
  }
}
