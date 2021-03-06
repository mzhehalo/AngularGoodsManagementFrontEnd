import {Component, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {AuthService} from '../login/auth.service';
import {Router} from '@angular/router';
import {WishlistService} from '../wishlist/wishlist.service';
import {CartService} from '../cart/cart.service';
import {OrderService} from '../order/order.service';
import {UserService} from '../edit-user/user.service';
import {UserModel} from '../../model/UserModel';
import {DropdownCategoriesComponent} from '../dropdown-categories/dropdown-categories.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  isLoggedIn: boolean;
  wishlistQuantity: number;
  cartQuantity: number;
  ordersQuantity: number;
  user: UserModel = new UserModel();
  isActiveBurger: boolean;
  @Output()
  isShowCategories = false;
  @Output()
  isShowProfile = false;
  @ViewChild(DropdownCategoriesComponent)
  dropdown: DropdownCategoriesComponent;

  constructor(private authService: AuthService,
              private router: Router,
              private wishlistService: WishlistService,
              private cartService: CartService,
              private orderService: OrderService,
              private userService: UserService,
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

    this.orderService.orderQuantityEmitter.subscribe(quantity => this.ordersQuantity = quantity);

    if (this.authService.isUserLoggedIn() && this.user.role === 'ROLE_SELLER') {
      this.subscription.add(
        this.orderService.getOrdersQuantity().subscribe(quantity => {
          this.orderService.orderQuantityEmitter.emit(quantity);
        })
      );
    }

    if (this.authService.isUserLoggedIn() && this.user.role === 'ROLE_CUSTOMER') {
      this.subscription.add(
        this.cartService.getCartProducts().subscribe(value => {
          this.cartQuantity = value.length;
        }));

      this.subscription.add(
        this.wishlistService.getLikesWishList().subscribe(value => {
          this.wishlistQuantity = value.length;
        })
      );
    }
  }

  routerMainPage(): void {
    if (this.router.url === '/' + this.user.firstName) {
      window.location.reload();
    } else {
      this.router.navigateByUrl(this.user.firstName);
    }
  }

  handleLogout(): void {
    this.authService.logout();
  }

  toggleBurger(): void {
    this.isActiveBurger = !this.isActiveBurger;
  }

  toggleCategories(): void {
    this.isShowCategories = !this.isShowCategories;
  }

  toggleProfile(): void {
    this.isShowProfile = !this.isShowProfile;
  }

  onClickedOutsideCategories(e: Event): void {
    this.isShowCategories = false;
    this.dropdown.toggleCategory = '';
  }

  onClickedOutsideProfile($event: Event): void {
    this.isShowProfile = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
