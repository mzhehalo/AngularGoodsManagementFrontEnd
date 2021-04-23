import {Injectable} from '@angular/core';
import {UserModel} from '../../model/UserModel';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EditUserService {
  private baseUrl = 'http://localhost:8100';

  constructor(private httpClient: HttpClient) {
  }

  editUser(user: UserModel, email: string): Observable<UserModel> {
    return this.httpClient.put<UserModel>(this.baseUrl + '/user/edit', {user, email});
  }
}
