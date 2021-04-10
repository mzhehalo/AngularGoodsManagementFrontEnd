import {Component, OnInit} from '@angular/core';
import {CartService} from '../cart/cart.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CartFullService} from './cart-full.service';
import {MessengerService} from '../../messengers/messenger.service';
import {WishlistService} from '../wishlist/wishlist.service';

@Component({
  selector: 'app-cart-full',
  templateUrl: './cart-full.component.html',
  styleUrls: ['./cart-full.component.css']
})
export class CartFullComponent implements OnInit {
  cartQuantity: number;
  shippingInformation: FormGroup;
  paymentOrderBoolean: boolean;

  constructor(private cartService: CartService,
              private formBuilder: FormBuilder,
              private cartFullService: CartFullService,
              private message: MessengerService,
              private wishlistService: WishlistService
  ) {
    this.shippingInformation = formBuilder.group({
      customerName: ['', [Validators.required]],
      customerAddress: ['', [Validators.required]],
      customerCountry: ['', [Validators.required]],
      customerNumber: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.cartService.cartQuantityEmitter.subscribe(value => {
      this.cartQuantity = value;
    });
    this.loadWishlist();
  }

  placeOrder(): void {
    this.cartFullService.placeOrder({
      customerName: this.shippingInformation.value.customerName,
      customerAddress: this.shippingInformation.value.customerAddress,
      customerCountry: this.shippingInformation.value.customerCountry,
      customerNumber: this.shippingInformation.value.customerNumber,
      paid: this.paymentOrderBoolean
    }).subscribe(value => {
      this.message.sendMessageCart();
    });
  }

  paid(): void {
    this.paymentOrderBoolean = !this.paymentOrderBoolean;
  }

  loadWishlist(): void {
    this.wishlistService.getLikesWishList().subscribe(wishListArr => {
      this.wishlistService.wishlistQuantityEmitter.emit(wishListArr.length);
    });
  }
}
