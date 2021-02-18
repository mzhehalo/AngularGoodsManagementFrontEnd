import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderModel} from '../../../../../model/OrderModel';

@Component({
  selector: 'app-order-item-full',
  templateUrl: './order-item-full.component.html',
  styleUrls: ['./order-item-full.component.css']
})
export class OrderItemFullComponent implements OnInit {
  order: OrderModel;

  constructor(private activatedRoute: ActivatedRoute) {
    this.order = activatedRoute.snapshot.data.Order;
  }

  ngOnInit(): void {
    console.log(this.order);
  }

}
