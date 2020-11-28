import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from '../../model/ProductModel';
import {ProductService} from './product.service';
import {WishlistService} from '../wishlist/wishlist.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Input()
  ProductsFromDataBase: ProductModel[];
  wishlist: number[] = [];

  constructor(private wishlistService: WishlistService) {
  }

  ngOnInit(): void {
    this.loadWishlist();
  }

  deleteProductById(id: number): void {
    console.log(id);
    console.log(this.ProductsFromDataBase);
    this.ProductsFromDataBase = this.ProductsFromDataBase.filter(product => product.id !== id);
  }

  loadWishlist(): void {
    this.wishlistService.getWishList().subscribe(productIds => {
      console.log(productIds);
      this.wishlist = productIds;
    });
  }

}
