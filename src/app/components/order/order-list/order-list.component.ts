import {Component, Input, OnInit} from '@angular/core';
import {OrderModel} from '../../../model/OrderModel';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  @Input()
  orderList: OrderModel[];
  constructor() { }

  ngOnInit(): void {
  }

}
