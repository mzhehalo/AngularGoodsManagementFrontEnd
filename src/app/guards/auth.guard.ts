import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, UrlTree, Router, CanActivateChild, CanLoad} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../components/login/auth.service';
import {UserRoles} from '../model/user-roles.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthService,
              private router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const allowedUserRoles = this.getRoutePermissions(route);
    return this.checkPermission(allowedUserRoles);
  }

  public canActivateChild(route: ActivatedRouteSnapshot): Promise<boolean> {
    const allowedUserRoles = this.getRoutePermissions(route);
    return this.checkPermission(allowedUserRoles);
  }

  public canLoad(): Promise<boolean> {
    return this.checkPermission(null);
  }

  getRoutePermissions(route: ActivatedRouteSnapshot): UserRoles[] {
    if (route.data && route.data.userRoles) {
      return route.data.userRoles as UserRoles[];
    }
    return null;
  }

  private checkPermission(allowedUserRoles: UserRoles[]): Promise<boolean> {
    return this.authService.getSession().then((session: boolean) => {
      if (session) {
        if (!allowedUserRoles) {
          return true;
        } else {
          return this.authService.getUserRole().then((userRole: string) => {
            if (this.authService.areUserRolesAllowed(userRole, allowedUserRoles)) {
              return true;
            } else {
              this.router.navigateByUrl('/no-permission');
              return false;
            }
          });
        }
      } else {
        return false;
      }
    });
  }
}
