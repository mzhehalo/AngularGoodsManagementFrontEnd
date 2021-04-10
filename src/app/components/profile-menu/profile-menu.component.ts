import {Component, OnInit} from '@angular/core';
import {AuthService} from '../login/auth.service';

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
    this.user = sessionStorage.getItem('FirstName');
    this.authService.loggedInEmitterUserFirstName.subscribe(firstName => {
      this.user = firstName;
      console.log(firstName);
    }, error => {
      console.log(error);
    });
  }
}
