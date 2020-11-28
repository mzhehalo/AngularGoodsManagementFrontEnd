import {Component, OnInit} from '@angular/core';
import {AuthService} from '../login/auth.service';
import {Router} from '@angular/router';
import {WishlistService} from '../wishlist/wishlist.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  firstName: string;
  isLoggedIn: any;
  role: string;
  wishlistQuantity: number;

  constructor(private authService: AuthService,
              private router: Router,
              private wishlistService: WishlistService
  ) {
    console.log('HEADER constructor');
  }

  ngOnInit(): void {
    this.wishlistService.wishlistArrLengthEmitter.subscribe(wishlistQuantityEm => {
      this.wishlistQuantity = wishlistQuantityEm;
      console.log('AAAAAAAAAAAAA' + this.wishlistQuantity);
    });
    this.firstName = this.authService.getFirstNameFromSessionStorage();
    console.log(this.firstName);
    this.role = sessionStorage.getItem('ROLE');
    this.authService.loggedInEmitterUserFirstName.subscribe(data => this.firstName = data);
    this.authService.loggedInEmitterUserRole.subscribe(data => this.role = data);
    this.authService.loggedInEmitter.subscribe((data: boolean) => this.isLoggedIn = data);

    if (this.authService.isUserLoggedIn()) {
      this.authService.loggedInEmitter.emit(true);
    }
    console.log('HEADER ngOnInit');
  }

  handleLogout(): void {
    this.authService.logout();
  }

  routerMainPage(): void {
    this.firstName = this.authService.getFirstNameFromSessionStorage();
    this.router.navigateByUrl(this.firstName);
  }

  routerEditProduct(): void {
    this.firstName = this.authService.getFirstNameFromSessionStorage();
    this.router.navigateByUrl(this.firstName + '/add-product');
  }
}
