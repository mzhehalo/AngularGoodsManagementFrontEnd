import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from './auth.service';
import {UserService} from '../edit-user/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {OrderService} from '../order/order.service';
import {CartService} from '../cart/cart.service';
import {WishlistService} from '../wishlist/wishlist.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  loginForm: FormGroup;
  successMessage: string;
  errorMessage: string;
  invalidLogin = false;
  loginSuccess = false;
  hidePass = true;
  infoMessage = '';

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private userService: UserService,
              private router: Router,
              private cartService: CartService,
              private orderService: OrderService,
              private wishlistService: WishlistService,
              private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.activatedRoute.queryParams
      .subscribe(params => {
        if (params.registered !== undefined && params.registered === 'true') {
          this.infoMessage = 'Registration Successful! Please Login!';
        }
      });

  }

  authenticate(): void {
    this.subscription.add(
      this.authService.authenticate({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }).subscribe((authResponse) => {
        this.authService.registerSuccessfulLogin(this.loginForm.value.email, authResponse);
        this.authService.loggedInEmitter.emit(true);
        this.setUserToSessionStorage();
        this.loadQuantity();
        this.invalidLogin = false;
        this.loginSuccess = true;
        this.successMessage = 'Login Successful';
      }, (error) => {
        console.log(error);
        this.errorMessage = 'Bad Credentials';
        this.invalidLogin = true;
        this.loginSuccess = false;
      })
    );
  }

  loadQuantity(): void {
    if (this.userService.getRoleFromSessionStorage() === 'ROLE_CUSTOMER') {
      this.subscription.add(
        this.cartService.getCartProducts().subscribe(value => {
          this.cartService.cartQuantityEmitter.emit(value.length);
        }));
      this.subscription.add(
        this.wishlistService.getLikesWishList().subscribe(value => {
          this.wishlistService.wishlistQuantityEmitter.emit(value.length);
        })
      );
    } else {
      this.subscription.add(
        this.orderService.getOrdersQuantity().subscribe(quantity => {
          this.orderService.orderQuantityEmitter.emit(quantity);
        }));
    }
  }

  setUserToSessionStorage(): void {
    this.subscription.add(
      this.userService.getAuthUserDetails().subscribe(user => {
        this.authService.loggedInEmitterUser.emit(user);
        this.userService.setUserIdToSessionStorage(String(user.id));
        this.userService.setRoleToSessionStorage(user.role);
        this.userService.setFirstNameToSessionStorage(user.firstName);
        this.router.navigate(['', this.userService.getFirstNameFromSessionStorage()]).then(data => {
        });
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
