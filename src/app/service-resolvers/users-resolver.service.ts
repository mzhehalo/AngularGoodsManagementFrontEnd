import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {UserModel} from '../model/UserModel';
import {Observable} from 'rxjs';
import {UserService} from '../components/edit-user/user.service';

@Injectable({
  providedIn: 'root'
})
export class UsersResolverService implements Resolve<UserModel[]>{

  constructor(private userService: UserService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserModel[]> | Promise<UserModel[]> | UserModel[] {
    return this.userService.getUsersDetails();
  }
}
