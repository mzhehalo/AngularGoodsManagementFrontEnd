import { Component, OnInit } from '@angular/core';
import {CartService} from '../cart/cart.service';

@Component({
  selector: 'app-cart-full',
  templateUrl: './cart-full.component.html',
  styleUrls: ['./cart-full.component.css']
})
export class CartFullComponent implements OnInit {

  cartQuantity: number;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartQuantityEmitter.subscribe(value => {
      this.cartQuantity = value;
    });
  }

}
