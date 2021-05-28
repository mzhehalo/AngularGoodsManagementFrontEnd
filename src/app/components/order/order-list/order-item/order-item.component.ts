import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {OrderModel} from '../../../../model/OrderModel';
import {OrderService} from '../../order.service';
import {MessengerService} from '../../../../messengers/messenger.service';
import {UserService} from '../../../edit-user/user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
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
    this.subscription.add(
      this.orderService.deleteOrder(orderId).subscribe(data => {
        this.orderService.orderQuantityEmitter.emit(data);
        this.messenger.sendMessageOrder();
      }, error => {
        console.log(error);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
