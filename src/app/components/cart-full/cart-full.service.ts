import { Injectable } from '@angular/core';
import {OrderModel} from '../../model/OrderModel';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../edit-user/user.service';

@Injectable({
  providedIn: 'root'
})
export class CartFullService {
  private baseUrl = 'http://localhost:8100';

  constructor(private http: HttpClient,
              private userService: UserService
              ) { }

  placeOrder(customerOrder: OrderModel): Observable<OrderModel> {
    const customerId = this.userService.getUserIdFromSessionStorage();
    return this.http.post<OrderModel>(this.baseUrl + '/order-info/add/' + customerId , customerOrder);
  }
}
