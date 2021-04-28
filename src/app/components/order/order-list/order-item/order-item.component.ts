import {Component, Input, OnInit} from '@angular/core';
import {OrderModel} from '../../../../model/OrderModel';
import {OrderService} from '../../order.service';
import {MessengerService} from '../../../../messengers/messenger.service';
import {UserService} from '../../../edit-user/user.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {

  @Input()
  order: OrderModel;

  constructor(private orderService: OrderService,
              private messenger: MessengerService,
              private userService: UserService
  ) {
  }

  ngOnInit(): void {
  }

  deleteOrder(orderId: number): void {
    this.orderService.deleteOrder(this.userService.getUserIdFromSessionStorage(), orderId).subscribe(data => {
      this.messenger.sendMessageOrder();
    }, error => {
      console.log(error);
    });
  }
}
