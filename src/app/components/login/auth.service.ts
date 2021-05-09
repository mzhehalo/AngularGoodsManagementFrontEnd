import {EventEmitter, Injectable, Output} from '@angular/core';
import {UserModel} from '../../model/UserModel';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {UserService} from '../edit-user/user.service';
import {Constants} from '../../config/constants';
import {Observable} from 'rxjs';
import {AuthenticationResponse} from '../../model/authentication-response';
import {AuthenticationRequest} from '../../model/authentication-request';

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
    this.userService.setEmailToSessionStorage(email);
  }

  setUserToSessionStorage(): void {
    this.userService.getUserDetailsByEmail(this.userService.getEmailFromSessionStorage()).subscribe(user => {
      this.loggedInEmitterUser.emit(user);
      this.userService.setUserIdToSessionStorage(String(user.id));
      this.userService.setRoleToSessionStorage(user.role);
      this.userService.setFirstNameToSessionStorage(user.firstName);
      this.router.navigate(['', this.userService.getFirstNameFromSessionStorage()]).then(data => {
      });
    });
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
}
