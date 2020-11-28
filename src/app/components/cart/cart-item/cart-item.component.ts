import {Component, Input, OnInit} from '@angular/core';
import {UsersService} from '../users.service';
import {UserModel} from '../../../model/UserModel';
import {ProductModel} from '../../../model/ProductModel';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input()
  product: ProductModel;
  constructor() { }

  ngOnInit(): void {
  }

}
