import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserModel} from '../../model/UserModel';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class User2Service {
  private baseUrl = 'http://localhost:8100';

  constructor(private httpClient: HttpClient) {
  }

  getUsers(): Observable<UserModel> {
    // const headers = new HttpHeaders({ Authorization: 'Basic ' +
    //     btoa('username:username') });
    return this.httpClient.get<UserModel>(this.baseUrl + '/users2');
  }
}
