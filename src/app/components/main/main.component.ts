import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../order/order.service';
import {UserService} from '../edit-user/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  role: string;
  isCategory: boolean;
  ordersQuantity: number;
  userId: number;

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private orderService: OrderService
  ) {
  }

  ngOnInit(): void {
    this.userId = this.userService.getUserIdFromSessionStorage();
    this.getAllOrders();
    this.isCategory = this.activatedRoute.snapshot.url[0] !== undefined;
    this.userService.getUserDetails(this.userId).subscribe(data => {
      this.role = data.role;
    });

    this.orderService.orderQuantityEmitter.subscribe(ordersQuantity => {
      this.ordersQuantity = ordersQuantity;
    });
  }

  getAllOrders(): void {
    this.orderService.getOrdersBySeller(this.userId).subscribe(orders => {
      this.orderService.orderQuantityEmitter.emit(orders.length);
    });
  }
}
