import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {UserModel} from '../model/UserModel';
import {Observable} from 'rxjs';
import {AuthService} from '../components/login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<UserModel>{

  constructor(private authService: AuthService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserModel> | Promise<UserModel> | UserModel {
    return this.authService.getUserDetails();
  }
}
