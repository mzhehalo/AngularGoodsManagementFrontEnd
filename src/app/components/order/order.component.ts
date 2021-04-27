import {Component, OnInit} from '@angular/core';
import {OrderModel} from '../../model/OrderModel';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from './order.service';
import {MessengerService} from '../../messengers/messenger.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  order: OrderModel;
  orderList: OrderModel[] = [];


  constructor(private activatedRoute: ActivatedRoute,
              private orderService: OrderService,
              private messenger: MessengerService
  ) {
    this.orderList = activatedRoute.snapshot.data.Orders;
  }

  ngOnInit(): void {
    this.getAllOrders();
    this.messenger.getMessageOrder().subscribe(trigger => {
      this.getAllOrders();
    });
  }

  getAllOrders(): void {
    this.orderService.getOrdersBySeller(Number(sessionStorage.getItem('ID'))).subscribe(orders => {
      this.orderService.orderQuantityEmitter.emit(orders.length);
      this.orderList = orders;
    });
  }

}
