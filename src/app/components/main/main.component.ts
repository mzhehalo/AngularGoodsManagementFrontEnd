import {Component, OnInit} from '@angular/core';
import {UsersService} from '../cart/users.service';
import {ActivatedRoute} from '@angular/router';
import {UserModel} from '../../model/UserModel';
import {ProductModel} from '../../model/ProductModel';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  ProductsFromDataBase: ProductModel[];

  constructor(private usersService: UsersService, private activatedRoute: ActivatedRoute) {
    this.ProductsFromDataBase = this.activatedRoute.snapshot.data.Products;
  }

  ngOnInit(): void {
    console.log(this.ProductsFromDataBase);
  }

}
