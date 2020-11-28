import {Component, Input, OnInit} from '@angular/core';
import {UsersService} from './users.service';
import {UserModel} from '../../model/UserModel';
import {ActivatedRoute} from '@angular/router';
import {ProductModel} from '../../model/ProductModel';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Input()
  ProductsFromDataBase: ProductModel[];


  constructor() {
  }

  ngOnInit(): void {
  }
}
