import {Component, OnInit} from '@angular/core';
import {MessengerService} from '../product-list/messenger.service';
import {CartService} from './cart.service';

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
    this.getAllCartProducts();
    this.messengerService.getMessageCart().subscribe(trigger => {
      this.getAllCartProducts();
    });
  }

  getAllCartProducts(): void {
    this.cartService.getCartProducts(Number(sessionStorage.getItem('ID'))).subscribe(value => {
      this.cartItems = value;
      this.cartService.cartQuantityEmitter.emit(this.cartItems.length);
      this.cartTotal = 0;
      this.cartItems.forEach((item => {
        this.cartTotal += (item.quantity * item.product.productPrice);
      }));
    });
  }
}
