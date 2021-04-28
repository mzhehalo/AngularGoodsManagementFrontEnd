import {Component, OnInit} from '@angular/core';
import {AuthService} from '../login/auth.service';
import {Router} from '@angular/router';
import {WishlistService} from '../wishlist/wishlist.service';
import {CartService} from '../cart/cart.service';
import {OrderService} from '../order/order.service';
import {UserService} from '../edit-user/user.service';
import {UserModel} from '../../model/UserModel';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: any;
  wishlistQuantity: number;
  cartQuantity: number;
  ordersQuantity: number;
  user: UserModel = new UserModel();

  constructor(private authService: AuthService,
              private router: Router,
              private wishlistService: WishlistService,
              private cartService: CartService,
              private orderService: OrderService,
              private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.user.firstName = this.userService.getFirstNameFromSessionStorage();
    this.user.role = this.userService.getRoleFromSessionStorage();

    this.authService.loggedInEmitterUser.subscribe(userEmitter => {
      this.user = userEmitter;
    });
    this.authService.loggedInEmitter.subscribe((data: boolean) => this.isLoggedIn = data);

    if (this.authService.isUserLoggedIn()) {
      this.authService.loggedInEmitter.emit(true);
    }

    this.cartService.cartQuantityEmitter.subscribe(cartQuantityEm => {
      this.cartQuantity = cartQuantityEm;
    });
    this.wishlistService.wishlistQuantityEmitter.subscribe(wishlistQuantityEm => {
      this.wishlistQuantity = wishlistQuantityEm;
    });
    this.orderService.orderQuantityEmitter.subscribe(ordersQuantity => {
      this.ordersQuantity = ordersQuantity;
    });
  }

  handleLogout(): void {
    this.authService.logout();
  }

  routerMainPage(): void {
    if (this.router.url === '/' + this.user.firstName) {
      window.location.reload();
    } else {
      this.router.navigateByUrl(this.user.firstName);
    }
  }

  routerEditProduct(): void {
    this.router.navigateByUrl(this.user.firstName + '/add-product');
  }
}
