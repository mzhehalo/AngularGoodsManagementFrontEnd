import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OrderModel} from '../../model/OrderModel';
import {Observable} from 'rxjs';
import {Constants} from '../../config/constants';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = Constants.API_BASE_URL + 'order-info/';

  @Output()
  orderQuantityEmitter: EventEmitter<number> = new EventEmitter<number>();

  constructor(private http: HttpClient) {
  }

  placeOrder(customerOrder: OrderModel): Observable<any> {
    return this.http.post(this.baseUrl + 'add', customerOrder);
  }

  getAllOrders(): Observable<OrderModel[]> {
    return this.http.get<OrderModel[]>(this.baseUrl + 'get/orders');
  }

  getOrdersQuantity(): Observable<number> {
    return this.http.get<number>(this.baseUrl + 'get/orders/quantity');
  }

  getOrder(orderId: number): Observable<OrderModel> {
    return this.http.get<OrderModel>(this.baseUrl + 'get/order/' + orderId);
  }

  deleteOrder(orderId: number): Observable<number> {
    return this.http.delete<number>(this.baseUrl + 'delete/' + orderId);
  }
}
