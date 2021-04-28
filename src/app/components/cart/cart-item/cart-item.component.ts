import {Component, Input, OnInit} from '@angular/core';
import {CartModel} from '../../../model/CartModel';
import {Router} from '@angular/router';
import {CartService} from '../cart.service';
import {MessengerService} from '../../../messengers/messenger.service';
import {UserService} from '../../edit-user/user.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input()
  cartItem: CartModel;
  role: string;
  currentUrl: string;
  userId: number;

  constructor(private userService: UserService,
              private router: Router,
              private cartService: CartService,
              private message: MessengerService
  ) {
  }

  ngOnInit(): void {
    this.userId = this.userService.getUserIdFromSessionStorage();
    this.userService.getUserDetails(this.userId).subscribe(data => {
      this.role = data.role;
    });
    this.currentUrl = this.router.url;
  }

  deleteFromCart(): void {
    this.cartService.deleteFromCart(this.userId, this.cartItem.product.id)
      .subscribe(value => {
        this.message.sendMessageCart();
      });
  }
}
