import {EventEmitter, Injectable, Output} from '@angular/core';
import {UserModel} from '../../model/UserModel';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8100';

  USER_EMAIL = 'Email';
  USER_NAME_SESSION_ID = 'ID';
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
  USER_NAME_SESSION_FIRST_NAME = 'FirstName';
  USER_NAME_SESSION_ROLE = 'ROLE';
  USER_FILTER_PRICE_MIN = 'priceMin';
  USER_FILTER_PRICE_MAX = 'priceMax';
  USER_FILTER_PRICE_MIN_POSSIBLE = 'priceMinPossible';
  USER_FILTER_PRICE_MAX_POSSIBLE = 'priceMaxPossible';
  @Output() loggedInEmitter: EventEmitter<boolean> = new EventEmitter();
  @Output() loggedInEmitterUserFirstName: EventEmitter<string> = new EventEmitter();
  @Output() loggedInEmitterUserRole: EventEmitter<string> = new EventEmitter();

  constructor(private httpClient: HttpClient,
              private http: HttpClient,
              private route: Router,
  ) {
  }

  authenticate(authenticationModel: UserModel): any {
    return this.httpClient.get(this.baseUrl + '/login',
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
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, `Basic ${btoa(email + ':' + password)}`);
    sessionStorage.setItem(this.USER_EMAIL, email);
  }

  setUserToSessionStorage(): void {
    this.getUserDetails().subscribe(user => {
      sessionStorage.setItem(this.USER_NAME_SESSION_ID, String(user.id));
      sessionStorage.setItem(this.USER_NAME_SESSION_ROLE, user.role);
      sessionStorage.setItem(this.USER_NAME_SESSION_FIRST_NAME, user.firstName);
      this.loggedInEmitterUserRole.emit(user.role);
      this.loggedInEmitterUserFirstName.emit(user.firstName);
    });
  }

  logout(): void {
    sessionStorage.clear();
    this.loggedInEmitter.emit(false);
    this.loggedInEmitterUserRole.emit(null);
    this.route.navigateByUrl('login');
  }

  isUserLoggedIn(): boolean {
    const user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    return user !== null;
  }

  getBasicAuth(): string {
    return sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
  }

  getFirstNameFromSessionStorage(): string {
    return sessionStorage.getItem(this.USER_NAME_SESSION_FIRST_NAME);
  }

  getUserDetails(): Observable<UserModel> {
    return this.http.post<UserModel>(this.baseUrl + '/user/get', sessionStorage.getItem(this.USER_EMAIL));
  }
}
