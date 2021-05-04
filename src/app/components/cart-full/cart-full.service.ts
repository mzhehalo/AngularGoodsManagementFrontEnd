import { Injectable } from '@angular/core';
import {OrderModel} from '../../model/OrderModel';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../edit-user/user.service';
import {Constants} from '../../config/constants';

@Injectable({
  providedIn: 'root'
})
export class CartFullService {
  private baseUrl = Constants.API_BASE_URL + 'order-info/';

  constructor(private http: HttpClient,
              private userService: UserService
              ) { }

  placeOrder(customerOrder: OrderModel): Observable<any> {
    const customerId = this.userService.getUserIdFromSessionStorage();
    return this.http.post(this.baseUrl + 'add/' + customerId , customerOrder);
  }
}
