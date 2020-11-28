import {EventEmitter, Injectable, Output} from '@angular/core';
import {UserModel} from '../../model/UserModel';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {ProductModel} from '../../model/ProductModel';
import {WishlistService} from '../wishlist/wishlist.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8100';

  USER_NAME_SESSION_ID = 'ID';
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
  USER_NAME_SESSION_FIRST_NAME = 'FirstName';
  USER_NAME_SESSION_ROLE = 'ROLE';
  public firstName: string;
  public password: any;
  @Output() loggedInEmitter: EventEmitter<boolean> = new EventEmitter();
  @Output() loggedInEmitterUserFirstName: EventEmitter<string> = new EventEmitter();
  @Output() loggedInEmitterUserRole: EventEmitter<string> = new EventEmitter();

  constructor(private httpClient: HttpClient,
              private http: HttpClient,
              private route: Router,
              private wishlistService: WishlistService) {
  }

  authenticate(authenticationModel: UserModel): any {
    console.log(authenticationModel.firstName + authenticationModel.password);
    return this.httpClient.get(this.baseUrl + '/login',
      {headers: {authorization: this.createBasicAuthToken(authenticationModel.firstName, authenticationModel.password)}})
      .pipe(map((res) => {
        this.firstName = authenticationModel.firstName;
        this.password = authenticationModel.password;
        this.registerSuccessfulLogin(authenticationModel.firstName, authenticationModel.password);
        this.loggedInEmitter.emit(true);
        this.loggedInEmitterUserFirstName.emit(authenticationModel.firstName);
        this.setUserToSessionStorage();
      }));
  }

  createBasicAuthToken(firstName: any, password: any): string {
    return 'Basic ' + btoa(firstName + ':' + password);
  }

  registerSuccessfulLogin(firstName: string, password: string): void {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, `Basic ${btoa(firstName + ':' + password)}`);
    sessionStorage.setItem('FirstName', firstName);
  }

  setUserToSessionStorage(): void {
    this.getUserDetails().subscribe(data => {
      sessionStorage.setItem(this.USER_NAME_SESSION_ID, String(data.id)),
        sessionStorage.setItem(this.USER_NAME_SESSION_ROLE, data.role),
        this.loggedInEmitterUserRole.emit(data.role);
    });
  }

  logout(): void {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    sessionStorage.removeItem(this.USER_NAME_SESSION_FIRST_NAME);
    sessionStorage.removeItem(this.USER_NAME_SESSION_ROLE);
    sessionStorage.removeItem(this.USER_NAME_SESSION_ID);
    this.firstName = null;
    this.password = null;
    this.loggedInEmitter.emit(false);
    this.loggedInEmitterUserRole.emit(null);
    this.route.navigateByUrl('login');
  }

  isUserLoggedIn(): boolean {
    const user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    console.log(user != null);
    return user !== null;
  }

  getBasicAuth(): string {
    return sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
  }

  getFirstNameFromSessionStorage(): string {
    return sessionStorage.getItem(this.USER_NAME_SESSION_FIRST_NAME);
  }

  getUserDetails(): Observable<UserModel> {
    return this.http.post<UserModel>(this.baseUrl + '/user/get', sessionStorage.getItem(this.USER_NAME_SESSION_FIRST_NAME));
  }

  // authent(): Observable<any> {
  //   const headers = new HttpHeaders({ Authorization: 'Basic ' +
  //       btoa('username:username') });
  //   return this.httpClient.get<UserModel>(this.baseUrl + '/login', {headers});
  // }
}
