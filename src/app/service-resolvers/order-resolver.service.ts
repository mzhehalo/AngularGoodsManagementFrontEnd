import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {OrderService} from '../components/order/order.service';
import {OrderModel} from '../model/OrderModel';

@Injectable({
  providedIn: 'root'
})
export class OrderResolverService implements Resolve<OrderModel>{

  constructor(private orderService: OrderService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OrderModel> | Promise<OrderModel> | OrderModel {
    return this.orderService.getOrder(route.params.orderId);
  }
}
