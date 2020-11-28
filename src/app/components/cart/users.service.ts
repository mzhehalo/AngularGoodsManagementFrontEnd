import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserModel} from '../../model/UserModel';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = 'http://localhost:8100';

  constructor(private httpClient: HttpClient) {
  }

  getUsers(): Observable<UserModel> {
    // const headers = new HttpHeaders({ Authorization: 'Basic ' +
    //     btoa('username:username') });
    return this.httpClient.get<UserModel>(this.baseUrl + '/users2');
  }
}
