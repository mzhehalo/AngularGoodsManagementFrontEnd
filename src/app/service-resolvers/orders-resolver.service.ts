import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {OrderModel} from '../model/OrderModel';
import {Observable} from 'rxjs';
import {OrderService} from '../components/order/order.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersResolverService implements Resolve<OrderModel[]>{
  constructor(private orderService: OrderService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OrderModel[]> | Promise<OrderModel[]> | OrderModel[] {
    return this.orderService.getAllOrders();
  }
}
