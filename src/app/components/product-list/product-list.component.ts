import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductModel} from '../../model/ProductModel';
import {ProductService} from './product.service';
import {WishlistService} from '../wishlist/wishlist.service';
import {Observable} from 'rxjs';
import {ActivatedRoute, Data} from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Input()
  productsFromDataBase: ProductModel[];
  wishlist: number[] = [];
  config: any;
  pageSizes: number[] = [3, 6, 9, 18];
  pageSize: number;

  constructor(private wishlistService: WishlistService,
              private activatedRoute: ActivatedRoute,
              private productService: ProductService
  ) {
    this.productsFromDataBase = this.activatedRoute.snapshot.data.Products.productList;

    this.config = {
      itemsPerPage: 6,
      currentPage: 0,
      totalItems: this.activatedRoute.snapshot.data.Products.totalElements
    };
  }

  ngOnInit(): void {
    this.loadWishlist();
    console.log(this.productsFromDataBase);
  }

  loadProducts(currentPage: number, size: number): void {
    this.productService.getProductDetails(currentPage, size).subscribe(value => {
      console.log(value);
      this.productsFromDataBase = value.productList;
      console.log('arrrrrray: ' + this.productsFromDataBase);
      this.config.totalItems = value.totalElements;
      this.config.currentPage = value.number + 1;
    });
  }

  deleteProductById(id: number): void {
    console.log(id);
    console.log(this.productsFromDataBase);
    this.productsFromDataBase = this.productsFromDataBase.filter(product => product.id !== id);
  }

  loadWishlist(): void {
    this.wishlistService.getLikesWishList().subscribe(wishListArr => {
      console.log(wishListArr);
      this.wishlist = wishListArr;
      this.wishlistService.wishlistArrLengthEmitter.emit(wishListArr.length);
    });
  }

  pageChanged(event): void {
    this.loadProducts(event, this.config.itemsPerPage);
    this.config.currentPage = event;
  }

  pageSizeChange(event): void {
    this.config.currentPage = 1;
    this.config.itemsPerPage = event.target.value;
    this.loadProducts(this.config.currentPage, event.target.value);
  }
}
