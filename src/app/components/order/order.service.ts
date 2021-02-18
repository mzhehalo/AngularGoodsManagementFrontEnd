import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OrderModel} from '../../model/OrderModel';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://localhost:8100/order-info';
  @Output()
  orderQuantityEmitter: EventEmitter<number> = new EventEmitter<number>();


  constructor(private http: HttpClient) {
  }

  getOrdersBySeller(sellerId: number): Observable<OrderModel[]> {
    return this.http.get<OrderModel[]>(this.baseUrl + '/get/orders/' + sellerId);
  }

  getOrderBySellerAndOrderId(sellerId: number, orderId: number): Observable<OrderModel> {
    return this.http.get<OrderModel>(this.baseUrl + '/get/order/' + sellerId + '/' + orderId );
  }

  deleteOrder(sellerId: number, orderId: number): Observable<{}> {
    return this.http.delete(this.baseUrl + '/delete/' + sellerId + '/' + orderId);
  }
}
