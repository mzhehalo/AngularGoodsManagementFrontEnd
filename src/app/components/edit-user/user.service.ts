import {Injectable} from '@angular/core';
import {UserModel} from '../../model/UserModel';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Constants} from '../../config/constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = Constants.API_BASE_URL + 'user/';

  constructor(private httpClient: HttpClient) {
  }

  getAuthUserDetails(): Observable<UserModel> {
    return this.httpClient.get<UserModel>(this.baseUrl + 'get');
  }

  getUserById(userId: number): Observable<UserModel> {
    return this.httpClient.get<UserModel>(this.baseUrl + 'admin/get/' + userId);
  }

  getUsersDetails(): Observable<UserModel[]> {
    return this.httpClient.get<UserModel[]>(this.baseUrl + 'get/all');
  }

  registerUser(user: UserModel): Observable<UserModel> {
    return this.httpClient.post<UserModel>(this.baseUrl + 'register', user);
  }

  editUser(user: UserModel): Observable<UserModel> {
    return this.httpClient.put<UserModel>(this.baseUrl + 'edit/', user);
  }

  deleteUser(): Observable<any> {
    return this.httpClient.delete<Observable<any>>(this.baseUrl + 'delete/');
  }

  deleteUserById(userId: number): Observable<any> {
    return this.httpClient.delete<Observable<any>>(this.baseUrl + 'admin/delete/' + userId);
  }

  getUserIdFromSessionStorage(): number {
    return Number(sessionStorage.getItem(Constants.USER_SESSION_ID));
  }

  setUserIdToSessionStorage(value): void {
    sessionStorage.setItem(Constants.USER_SESSION_ID, value);
  }

  getFirstNameFromSessionStorage(): string {
    return sessionStorage.getItem(Constants.USER_SESSION_FIRST_NAME);
  }

  setFirstNameToSessionStorage(value): void {
    sessionStorage.setItem(Constants.USER_SESSION_FIRST_NAME, value);
  }

  getAuthenticateNameFromSessionStorage(): string {
    return sessionStorage.getItem(Constants.USER_SESSION_AUTHENTICATE_NAME);
  }

  setAuthenticateNameToSessionStorage(value): void {
    sessionStorage.setItem(Constants.USER_SESSION_AUTHENTICATE_NAME, value);
  }

  getRoleFromSessionStorage(): string {
    return sessionStorage.getItem(Constants.USER_SESSION_ROLE);
  }

  setRoleToSessionStorage(value): void {
    sessionStorage.setItem(Constants.USER_SESSION_ROLE, value);
  }
}
