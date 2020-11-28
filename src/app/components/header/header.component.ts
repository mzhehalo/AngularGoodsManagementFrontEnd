import { Component, OnInit} from '@angular/core';
import {AuthService} from '../login/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: string;
  isLoggedIn: any;
  role: string;
  wishlistQuantity: number;

  constructor(private authService: AuthService, private router: Router,) {
    console.log('HEADER constructor');
  }


  ngOnInit(): void {
    this.user = this.authService.getFirstNameFromSessionStorage();
    console.log(this.user);
    // this.user = sessionStorage.getItem('FirstName');
    this.role = sessionStorage.getItem('ROLE');
    this.authService.loggedInEmitterUserFirstName.subscribe(data => this.user = data);
    this.authService.loggedInEmitterUserRole.subscribe(data => this.role = data);
    // this.authService.loggedInEmitterUserFirstName.subscribe((data: string) => this.user = data);
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
    this.user = this.authService.getFirstNameFromSessionStorage();
    this.router.navigateByUrl(this.user);
  }

  routerEditProduct(): void {
    this.user = this.authService.getFirstNameFromSessionStorage();
    this.router.navigateByUrl(this.user + '/add-product');
  }
}
