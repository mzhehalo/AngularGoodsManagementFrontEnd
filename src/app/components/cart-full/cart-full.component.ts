import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from '../cart/cart.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessengerService} from '../../messengers/messenger.service';
import {WishlistService} from '../wishlist/wishlist.service';
import {Subscription} from 'rxjs';
import {OrderService} from '../order/order.service';

@Component({
  selector: 'app-cart-full',
  templateUrl: './cart-full.component.html',
  styleUrls: ['./cart-full.component.css']
})
export class CartFullComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  cartQuantity: number;
  shippingInformation: FormGroup;
  isPaid: boolean;

  constructor(private cartService: CartService,
              private formBuilder: FormBuilder,
              private message: MessengerService,
              private wishlistService: WishlistService,
              private orderService: OrderService
  ) {
  }

  ngOnInit(): void {
    this.shippingInformation = this.formBuilder.group({
      customerName: ['', [Validators.required]],
      customerAddress: ['', [Validators.required]],
      customerCountry: ['', [Validators.required]],
      customerNumber: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      isPaid: ['', [Validators.requiredTrue]],
      isCartEmpty: ['', [Validators.requiredTrue]]
    });
    this.cartService.cartQuantityEmitter.subscribe(value => {
      this.cartQuantity = value;
      if (value > 0) {
        this.shippingInformation.controls.isCartEmpty.setValue(true);
      } else {
        this.shippingInformation.controls.isCartEmpty.setValue(false);
      }
    });
  }

  placeOrder(): void {
    this.subscription.add(
      this.orderService.placeOrder({
        customerName: this.shippingInformation.value.customerName,
        customerAddress: this.shippingInformation.value.customerAddress,
        customerCountry: this.shippingInformation.value.customerCountry,
        customerNumber: this.shippingInformation.value.customerNumber,
        paid: this.isPaid
      }).subscribe(value => {
      }, error => {
        console.log(error);
        this.shippingInformation.reset();
        this.message.sendMessageCart();
      })
    );
  }

  paid(isPaid: boolean): void {
    this.shippingInformation.controls.isPaid.setValue(isPaid);
    this.isPaid = isPaid;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
