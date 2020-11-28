import {Component, OnInit} from '@angular/core';
import {AuthService} from '../login/auth.service';
import {UserModel} from '../../model/UserModel';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.css']
})
export class ProfileMenuComponent implements OnInit {
  user: string;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    // this.authService.loggedInEmitterUserFirstName.subscribe((data: string) => this.user = data);
    this.user = this.authService.getFirstNameFromSessionStorage();


    // if (this.authService.isUserLoggedIn()) {
    //   this.authService.loggedInEmitterUserFirstName.emit(sessionStorage.getItem('FirstName'));
    // }
  }
}
