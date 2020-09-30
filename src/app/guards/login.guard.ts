import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {LoginComponent} from '../components/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private activatedRoute: ActivatedRoute) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return confirm('Вы уверены, что хотите перейти?');
    // console.log(this.loginComponent.userPresent);
    // this.activatedRoute.data.subscribe(value => console.log(value));
    return true;
    // this.router.navigate(['/login']);
    // return false;
  }
}
