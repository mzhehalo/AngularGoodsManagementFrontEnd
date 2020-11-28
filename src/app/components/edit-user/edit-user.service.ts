import {Injectable} from '@angular/core';
import {UserModel} from '../../model/UserModel';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {AuthService} from '../login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EditUserService {
  private baseUrl = 'http://localhost:8100';

  constructor(private httpClient: HttpClient) {
  }

  editUser(user: UserModel, firstName: string): Observable<UserModel> {
    const body = {user, firstName};
    console.log(body);
    return this.httpClient.put<UserModel>(this.baseUrl + 'user/edit', body);
  }
}
