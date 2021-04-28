import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {OrderService} from '../components/order/order.service';
import {OrderModel} from '../model/OrderModel';
import {UserService} from '../components/edit-user/user.service';

@Injectable({
  providedIn: 'root'
})
export class OrderResolverService implements Resolve<OrderModel>{

  constructor(private orderService: OrderService,
              private userService: UserService
              ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OrderModel> | Promise<OrderModel> | OrderModel {
    return this.orderService.getOrderBySellerAndOrderId(this.userService.getUserIdFromSessionStorage(), route.params.orderId);
  }
}
