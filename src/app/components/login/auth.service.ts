import {EventEmitter, Injectable, Output} from '@angular/core';
import {UserModel} from '../../model/UserModel';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {UserService} from '../edit-user/user.service';
import {Constants} from '../../config/constants';
import {Observable} from 'rxjs';
import {AuthenticationResponse} from '../../model/authentication-response';
import {AuthenticationRequest} from '../../model/authentication-request';
import {UserRoles} from '../../model/user-roles.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = Constants.API_BASE_URL;
  @Output() loggedInEmitter: EventEmitter<boolean> = new EventEmitter();
  @Output() loggedInEmitterUser: EventEmitter<UserModel> = new EventEmitter();

  constructor(private httpClient: HttpClient,
              private router: Router,
              private userService: UserService
  ) {
  }

  authenticate(authenticationRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.httpClient.post<AuthenticationResponse>(this.baseUrl + 'login',
      authenticationRequest);
  }

  registerSuccessfulLogin(email: string, authResponse: AuthenticationResponse): void {
    this.userService.setAuthenticateNameToSessionStorage(`Bearer ${authResponse.jwtToken}`);
  }

  logout(): void {
    sessionStorage.clear();
    this.loggedInEmitter.emit(false);
    this.loggedInEmitterUser.emit(new UserModel());
    this.router.navigateByUrl('login').then(data => {
    });
  }

  isUserLoggedIn(): boolean {
    const user = this.userService.getAuthenticateNameFromSessionStorage();
    return user !== null;
  }

  getJwtToken(): string {
    return this.userService.getAuthenticateNameFromSessionStorage();
  }

  public getSession(): Promise<boolean> {
    const session = this.getJwtToken();
    return new Promise((resolve, reject) => {
      if (session) {
        return resolve(true);
      } else {
        this.router.navigateByUrl('login');
        return reject(false);
      }
    });
  }

  public areUserRolesAllowed(userRole: string, allowedUserRoles: UserRoles[]): boolean {
    for (const allowedRole of allowedUserRoles) {
      if (userRole.toLowerCase() === allowedRole.toLowerCase()) {
        return true;
      }
    }
    return false;
  }

  public getUserRole(): Promise<string> {
    const sessionRole = this.userService.getRoleFromSessionStorage();
    return new Promise((resolve, reject) => {
      if (sessionRole) {
        return resolve(sessionRole);
      } else {
        return reject(false);
      }
    });
  }

}
