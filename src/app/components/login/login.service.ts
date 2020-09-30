import {Injectable} from '@angular/core';
import {UserModel} from '../../model/UserModel';
import {Observable, Subscription} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'http://localhost:8100';
  authenticated = false;

  constructor(private httpClient: HttpClient) {
  }

  login(userLoginArr: UserModel): any {
    console.log(userLoginArr);
    return this.httpClient.post(this.baseUrl + '/login', userLoginArr).subscribe(response =>
      console.log(response));
  }
}
