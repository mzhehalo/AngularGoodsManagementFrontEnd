import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductModel} from '../../model/ProductModel';
import {ProductService} from './product.service';
import {WishlistService} from '../wishlist/wishlist.service';
import {ActivatedRoute} from '@angular/router';
import {MessengerService} from '../../messengers/messenger.service';
import {FilterService} from '../filters/filter.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  productsFromDataBase: ProductModel[];
  wishlist: number[] = [];
  config: any;
  pageSizes: number[] = [3, 6, 9, 18];
  pageSize: number;
  totalItems: number;
  priceMin: number;
  priceMax: number;

  constructor(private wishlistService: WishlistService,
              private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private messengerService: MessengerService,
              private filterService: FilterService
  ) {
  }

  ngOnInit(): void {
    this.priceMin = 0;
    this.priceMax = 999999999;
    this.productsFromDataBase = this.activatedRoute.snapshot.data.Products.productList;
    this.totalItems = this.activatedRoute.snapshot.data.Products.totalElements;
    this.loadLikes();
    this.config = {
      itemsPerPage: 6,
      currentPage: 0,
      totalItems: this.totalItems
    };
    this.messengerService.getMessageDeleteProduct().subscribe(id => {
      this.productsFromDataBase = this.productsFromDataBase.filter(product => product.id !== id);
    });

    this.messengerService.getMessageFilter().subscribe(mess => {
      this.priceMin = this.filterService.getPriceMin();
      this.priceMax = this.filterService.getPriceMax();
      this.loadProducts(1, 6);
    });
  }

  loadProducts(currentPage: number, size: number): void {
    this.subscription.add(
      this.productService.getProductDetails(currentPage, size, this.priceMin, this.priceMax).subscribe(value => {
        this.productsFromDataBase = value.productList;
        this.config.totalItems = value.totalElements;
        this.config.currentPage = value.number + 1;
      })
    );
  }

  loadLikes(): void {
    this.subscription.add(
      this.wishlistService.getLikesWishList().subscribe(wishListArr => {
        this.wishlist = wishListArr;
      })
    );
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
