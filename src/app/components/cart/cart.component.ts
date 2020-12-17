import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductModel} from '../../model/ProductModel';
import {MessengerService} from '../product-list/messenger.service';
import {CartService} from './cart.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems = [];
  cartTotal = 0;

  constructor(private messengerService: MessengerService, private cartService: CartService) {
  }

  ngOnInit(): void {
    console.log('sum:----' + this.cartItems);
    this.getAllCartProducts();
    this.messengerService.getMessage().subscribe(trigger => {
      this.getAllCartProducts();
    });
  }

  getAllCartProducts(): void {
    this.cartService.getCartProducts(Number(sessionStorage.getItem('ID'))).subscribe(value => {
      console.log(value);
      this.cartItems = value;
      this.cartService.cartQuantityEmitter.emit(this.cartItems.length);
      this.cartTotal = 0;
      this.cartItems.forEach((item => {
        this.cartTotal += (item.quantity * item.product.productPrice);
      }));
    });
  }
}
