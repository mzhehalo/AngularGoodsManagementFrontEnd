import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from '../../../model/ProductModel';
import {CartModel} from '../../../model/CartModel';
import {AuthService} from '../../login/auth.service';
import {Router} from '@angular/router';
import {CartService} from '../cart.service';
import {MessengerService} from '../../product-list/messenger.service';

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

  constructor(private authService: AuthService,
              private router: Router,
              private cartService: CartService,
              private message: MessengerService
  ) {
  }

  ngOnInit(): void {
    console.log(this.cartItem);
    this.authService.getUserDetails().subscribe(data => {
      this.role = data.role;
    });
    this.currentUrl = this.router.url;
    console.log(this.router);
    console.log(this.router.url);
  }

  deleteFromCart(): void {
    this.cartService.deleteFromCart(Number(sessionStorage.getItem('ID')), this.cartItem.product.id)
      .subscribe(value => {
        this.message.sendMessage();
        console.log(value);
      });
  }
}
