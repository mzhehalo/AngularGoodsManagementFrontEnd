import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserModel} from '../../model/UserModel';
import {ProductModel} from '../../model/ProductModel';
import {CartService} from '../cart/cart.service';
import {AuthService} from '../login/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  role: string;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.getUserDetails().subscribe(data => {
      this.role = data.role;
    });
  }

}
