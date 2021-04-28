import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {UserModel} from '../model/UserModel';
import {Observable} from 'rxjs';
import {UserService} from '../components/edit-user/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<UserModel> {

  constructor(private userService: UserService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserModel> | Promise<UserModel> | UserModel {
    if (this.userService.getRoleFromSessionStorage() === 'ROLE_ADMIN') {
      return this.userService.getUserDetails(route.params.userId);
    } else {
      return this.userService.getUserDetails(this.userService.getUserIdFromSessionStorage());
    }
  }
}
