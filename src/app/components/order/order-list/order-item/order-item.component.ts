import {Component, Input, OnInit} from '@angular/core';
import {OrderModel} from '../../../../model/OrderModel';
import {OrderService} from '../../order.service';
import {MessengerService} from '../../../product-list/messenger.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {

  @Input()
  order: OrderModel;

  constructor(private orderService: OrderService,
              private messenger: MessengerService
  ) {
  }

  ngOnInit(): void {
  }

  deleteOrder(orderId: number): void {
    this.orderService.deleteOrder(Number(sessionStorage.getItem('ID')), orderId).subscribe(data => {
      console.log(data);
      this.messenger.sendMessageOrder();
    }, error => {
      console.log(error);
    });
  }
}
