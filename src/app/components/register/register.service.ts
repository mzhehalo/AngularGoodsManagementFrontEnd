import { Injectable } from '@angular/core';
import {UserModel} from '../../model/UserModel';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private baseUrl = 'http://localhost:8100';

  constructor(private httpClient: HttpClient) { }

  registerUser(user: UserModel): Observable<UserModel> {
    return this.httpClient.post<UserModel>(this.baseUrl + '/register', user);
  }
}
