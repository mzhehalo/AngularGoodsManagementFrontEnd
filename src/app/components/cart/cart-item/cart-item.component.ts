import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CartModel} from '../../../model/CartModel';
import {Router} from '@angular/router';
import {CartService} from '../cart.service';
import {MessengerService} from '../../../messengers/messenger.service';
import {UserService} from '../../edit-user/user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  @Input()
  cartItem: CartModel;
  role: string;
  currentUrl: string;

  constructor(private userService: UserService,
              private router: Router,
              private cartService: CartService,
              private message: MessengerService
  ) {
  }

  ngOnInit(): void {
    this.subscription.add(
      this.userService.getAuthUserDetails().subscribe(data => {
        this.role = data.role;
      })
    );
    this.currentUrl = this.router.url;
  }

  deleteFromCart(): void {
    this.subscription.add(
      this.cartService.deleteFromCart(this.cartItem.product.id)
        .subscribe(value => {
          this.message.sendMessageCart();
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
