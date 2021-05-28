import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderModel} from '../../model/OrderModel';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from './order.service';
import {MessengerService} from '../../messengers/messenger.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  order: OrderModel;
  orderList: OrderModel[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private orderService: OrderService,
              private messenger: MessengerService,
  ) {
  }

  ngOnInit(): void {
    this.orderList = this.activatedRoute.snapshot.data.Orders;
    this.getAllOrders();
    this.messenger.getMessageOrder().subscribe(trigger => {
      this.getAllOrders();
    });

    // this.subscription.add(
    //   this.orderService.getOrdersQuantity().subscribe(quantity => {
    //     this.orderService.orderQuantityEmitter.emit(quantity);
    //   })
    // );
  }

  getAllOrders(): void {
    this.subscription.add(
      this.orderService.getAllOrders().subscribe(orders => {
        this.orderList = orders;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
