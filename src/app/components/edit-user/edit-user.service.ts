import {Injectable} from '@angular/core';
import {UserModel} from '../../model/UserModel';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EditUserService {
  private baseUrl = 'http://localhost:8100/user';

  constructor(private httpClient: HttpClient) {
  }

  editUser(user: UserModel, email: string): Observable<UserModel> {
    return this.httpClient.put<UserModel>(this.baseUrl + '/edit', {user, email});
  }

  registerUser(user: UserModel): Observable<UserModel> {
    return this.httpClient.post<UserModel>(this.baseUrl + '/register', user);
  }

  deleteUser(userId: number): Observable<any> {
    return this.httpClient.delete<Observable<any>>(this.baseUrl + '/delete/' + userId);
  }
}
