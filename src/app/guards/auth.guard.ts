import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {LoginComponent} from '../components/login/login.component';
import {AuthService} from '../components/login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isUserLoggedIn() === true) {
      this.router.navigateByUrl('/' + this.authService.getFirstNameFromSessionStorage());
      console.log(this.authService.getFirstNameFromSessionStorage());
    }
    // else if (this.router.url !== '/login') {
    //   this.router.navigate(['/login']);
    //   console.log(this.router.url);
    // }
    return true;
  }
}
