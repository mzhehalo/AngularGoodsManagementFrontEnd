import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../login/auth.service';
import {OrderService} from '../order/order.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  role: string;
  isCategory: boolean;
  ordersQuantity: number;

  constructor(private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private orderService: OrderService
  ) {
  }

  ngOnInit(): void {
    this.getAllOrders();
    this.isCategory = this.activatedRoute.snapshot.url[0] !== undefined;
    this.authService.getUserDetails().subscribe(data => {
      this.role = data.role;
    });

    this.orderService.orderQuantityEmitter.subscribe(ordersQuantity => {
      this.ordersQuantity = ordersQuantity;
    });
  }

  getAllOrders(): void {
    this.orderService.getOrdersBySeller(Number(sessionStorage.getItem('ID'))).subscribe(orders => {
      this.orderService.orderQuantityEmitter.emit(orders.length);
    });
  }
}
