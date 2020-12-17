import { Injectable } from '@angular/core';
import {OrderModel} from '../../model/OrderModel';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartFullService {
  private baseUrl = 'http://localhost:8100';

  constructor(private http: HttpClient) { }

  placeOrder(customerOrder: OrderModel): Observable<OrderModel> {
    const customerId = sessionStorage.getItem('ID');
    return this.http.post<OrderModel>(this.baseUrl + '/order-info/add/' + customerId , customerOrder);
  }
}
