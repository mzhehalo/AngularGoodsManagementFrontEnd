import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../../model/UserModel';
import {Observable} from 'rxjs';
import {UserLoginModel} from '../../model/UserLoginModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8100';

  constructor(private httpClient: HttpClient) {
  }

  validateUser(userLoginArr: UserModel): Observable<UserModel> {
    return this.httpClient.post<UserModel>(this.baseUrl + '/login', userLoginArr);
  }

  registerUser(user: UserModel): Observable<UserModel> {
    return this.httpClient.post<UserModel>(this.baseUrl + '/register', user);
  }
}
