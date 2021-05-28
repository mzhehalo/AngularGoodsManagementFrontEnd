import {Component, OnDestroy, OnInit} from '@angular/core';
import {WishlistService} from '../wishlist/wishlist.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductModel} from '../../model/ProductModel';
import {DropdownCategoriesService} from '../dropdown-categories/dropdown-categories.service';
import {MessengerService} from '../../messengers/messenger.service';
import {Subscription} from 'rxjs';
import {FilterService} from '../filters/filter.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProductService} from '../product-list/product.service';

@Component({
  selector: 'app-product-list-by-category',
  templateUrl: './product-list-by-category.component.html',
  styleUrls: ['./product-list-by-category.component.css']
})
export class ProductListByCategoryComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  productsFromDataBase: ProductModel[];
  wishlist: number[] = [];
  config: any;
  pageSizes: number[] = [3, 6, 9, 18];
  pageSize: number;
  totalItems: number;
  mainCategory: string;
  subCategory: string;
  priceMin: number;
  priceMax: number;
  pageSizeForm: FormGroup;

  constructor(private wishlistService: WishlistService,
              private dropdownCategoriesService: DropdownCategoriesService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private messengerService: MessengerService,
              private filterService: FilterService,
              private formBuilder: FormBuilder,
              private productService: ProductService
  ) {
    this.activatedRoute.params.subscribe(routeParams => {
      if (this.productsFromDataBase) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit(): void {
    this.loadLikes();
    this.pageSizeForm = this.formBuilder.group({
      pageSize: [6]
    });
    this.pageSizeForm.controls.pageSize.valueChanges.subscribe(value => {
      this.pageSizeChange(value);
    });
    this.priceMin = 0;
    this.priceMax = 999999999;
    this.subCategory = this.activatedRoute.snapshot.url[1].toString();
    this.productsFromDataBase = this.activatedRoute.snapshot.data.CategoryProducts.productList;
    this.totalItems = this.activatedRoute.snapshot.data.CategoryProducts.totalElements;
    this.config = {
      itemsPerPage: 6,
      currentPage: 1,
      totalItems: this.totalItems
    };
    this.dropdownCategoriesService.mainCategoryEmitter.subscribe(value => {
      this.mainCategory = value;
    });
    this.dropdownCategoriesService.subCategoryEmitter.subscribe(value => {
      this.subCategory = value;
    });

    this.messengerService.getMessageDeleteProduct().subscribe(id => {
      this.productsFromDataBase = this.productsFromDataBase.filter(product => product.id !== id);
    });

    this.messengerService.getMessageFilterCategory().subscribe(mess => {
      this.priceMin = this.filterService.getPriceMin();
      this.priceMax = this.filterService.getPriceMax();
      this.loadProducts(1, 6);
    });

    this.subscription.add(
      this.productService.getProductMinMax(this.activatedRoute.snapshot.params.mainCategory,
        this.activatedRoute.snapshot.params.subCategory).subscribe(value => {
          this.filterService.minPossible.emit(value.priceMin);
          this.filterService.maxPossible.emit(value.priceMax);
      })
    );
  }

  loadProducts(currentPage: number,
               size: number): void {
    this.subscription.add(
      this.dropdownCategoriesService.getProductsByCategory(this.activatedRoute.snapshot.url[0].toString(),
        this.activatedRoute.snapshot.url[1].toString(),
        currentPage,
        size,
        this.priceMin,
        this.priceMax)
        .subscribe(value => {
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
    this.loadProducts(
      event,
      this.config.itemsPerPage);
    this.config.currentPage = event;
  }

  pageSizeChange(pageSize: number): void {
    this.config.currentPage = 1;
    this.config.itemsPerPage = pageSize;
    this.loadProducts(
      this.config.currentPage,
      pageSize);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
