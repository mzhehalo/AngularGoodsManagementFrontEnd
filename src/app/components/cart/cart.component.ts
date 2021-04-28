import {Component, OnInit} from '@angular/core';
import {MessengerService} from '../../messengers/messenger.service';
import {CartService} from './cart.service';
import {UserService} from '../edit-user/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems = [];
  cartTotal = 0;

  constructor(private messengerService: MessengerService,
              private cartService: CartService,
              private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.getAllCartProducts();
    this.messengerService.getMessageCart().subscribe(trigger => {
      this.getAllCartProducts();
    });
  }

  getAllCartProducts(): void {
    this.cartService.getCartProducts(this.userService.getUserIdFromSessionStorage()).subscribe(value => {
      this.cartItems = value;
      this.cartService.cartQuantityEmitter.emit(this.cartItems.length);
      this.cartTotal = 0;
      this.cartItems.forEach((item => {
        this.cartTotal += (item.quantity * item.product.productPrice);
      }));
    });
  }
}
