import {Component, OnInit} from '@angular/core';
import {WishlistService} from '../wishlist/wishlist.service';
import {ActivatedRoute, Event, NavigationEnd, Router} from '@angular/router';
import {ProductModel} from '../../model/ProductModel';
import {DropdownCategoriesService} from '../dropdown-categories/dropdown-categories.service';

@Component({
  selector: 'app-product-list-by-category',
  templateUrl: './product-list-by-category.component.html',
  styleUrls: ['./product-list-by-category.component.css']
})
export class ProductListByCategoryComponent implements OnInit {
  productsFromDataBase: ProductModel[];
  wishlist: number[] = [];
  config: any;
  pageSizes: number[] = [3, 6, 9, 18];
  pageSize: number;
  totalItems: number;
  mainCategory: string;
  subCategory: string;

  constructor(private wishlistService: WishlistService,
              private activatedRoute: ActivatedRoute,
              private dropdownCategoriesService: DropdownCategoriesService,
              private router: Router,
              private activatedRouteSnapshot: ActivatedRoute
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit(): void {
    this.productsFromDataBase = this.activatedRoute.snapshot.data.CategoryProducts.productList;
    this.totalItems = this.activatedRoute.snapshot.data.CategoryProducts.totalElements;

    this.loadWishlist();
    this.config = {
      itemsPerPage: 6,
      currentPage: 0,
      totalItems: this.totalItems
    };
    this.dropdownCategoriesService.mainCategoryEmitter.subscribe(value => {
      this.mainCategory = value;
    });
    this.dropdownCategoriesService.subCategoryEmitter.subscribe(value => {
      this.subCategory = value;
    });
  }

  loadProducts(mainCategory: string, subCategory: string, currentPage: number, size: number): void {
    this.dropdownCategoriesService.getProductsByCategory(this.activatedRouteSnapshot.snapshot.url[0].toString(),
      this.activatedRouteSnapshot.snapshot.url[1].toString(),
      currentPage,
      size)
      .subscribe(value => {
        this.productsFromDataBase = value.productList;
        this.config.totalItems = value.totalElements;
        this.config.currentPage = value.number + 1;
      });
  }

  deleteProductById(id: number): void {
    this.productsFromDataBase = this.productsFromDataBase.filter(product => product.id !== id);
  }

  loadWishlist(): void {
    this.wishlistService.getLikesWishList().subscribe(wishListArr => {
      this.wishlist = wishListArr;
      this.wishlistService.wishlistQuantityEmitter.emit(wishListArr.length);
    });
  }

  pageChanged(event): void {
    this.loadProducts(this.router.url[0].toString(), this.router.url[1].toString(), event, this.config.itemsPerPage);
    this.config.currentPage = event;
  }

  pageSizeChange(event): void {
    this.config.currentPage = 1;
    this.config.itemsPerPage = event.target.value;
    this.loadProducts(this.activatedRouteSnapshot.snapshot.url[0].toString(),
      this.activatedRouteSnapshot.snapshot.url[1].toString(),
      this.config.currentPage,
      event.target.value);
  }
}
