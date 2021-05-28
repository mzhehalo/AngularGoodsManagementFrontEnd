import {Component, OnDestroy, OnInit} from '@angular/core';
import {MessengerService} from '../../messengers/messenger.service';
import {CartService} from './cart.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  cartItems = [];
  cartTotal = 0;

  constructor(private messengerService: MessengerService,
              private cartService: CartService,
  ) {
  }


  ngOnInit(): void {
    this.getAllCartProducts();
    this.messengerService.getMessageCart().subscribe(trigger => {
      this.getAllCartProducts();
    });
  }

  getAllCartProducts(): void {
    this.subscription.add(
      this.cartService.getCartProducts().subscribe(value => {
        this.cartService.cartQuantityEmitter.emit(value.length);
        this.cartItems = value;
        this.cartTotal = 0;
        this.cartItems.forEach((item => {
          this.cartTotal += (item.quantity * item.product.productPrice);
        }));
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
