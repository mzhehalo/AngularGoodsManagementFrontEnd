import {EventEmitter, Injectable, Output} from '@angular/core';
import {UserModel} from '../../model/UserModel';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {UserService} from '../edit-user/user.service';
import {Constants} from '../../config/constants';

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

  authenticate(authenticationModel: UserModel): any {
    return this.httpClient.get(this.baseUrl + 'login',
      {headers: {authorization: this.createBasicAuthToken(authenticationModel.email, authenticationModel.password)}})
      .pipe(map((res) => {
        this.registerSuccessfulLogin(authenticationModel.email, authenticationModel.password);
        this.loggedInEmitter.emit(true);
        this.setUserToSessionStorage();
      }));
  }

  createBasicAuthToken(email: any, password: any): string {
    return 'Basic ' + btoa(email + ':' + password);
  }

  registerSuccessfulLogin(email: string, password: string): void {
    this.userService.setAuthenticateNameToSessionStorage(`Basic ${btoa(email + ':' + password)}`);
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

  getBasicAuth(): string {
    return this.userService.getAuthenticateNameFromSessionStorage();
  }
}
