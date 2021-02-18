import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from '../../../../model/ProductModel';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../login/auth.service';
import {ProductListComponent} from '../../product-list.component';
import {ProductService} from '../../product.service';
import {WishlistService} from '../../../wishlist/wishlist.service';

@Component({
  selector: 'app-product-item-full',
  templateUrl: './product-item-full.component.html',
  styleUrls: ['./product-item-full.component.css']
})
export class ProductItemFullComponent implements OnInit {
  product: ProductModel;
  role: string;
  firstNameFromStorage: string;
  wishListBoolean: boolean;
  wishListArr: number[];

  constructor(private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private productList: ProductListComponent,
              private productService: ProductService,
              private router: Router,
              private wishlistService: WishlistService
  ) {
    this.product = this.activatedRoute.snapshot.data.Product;
    this.wishListArr = this.activatedRoute.snapshot.data.WishlistArr;
  }

  ngOnInit(): void {
    this.wishlistService.wishlistItemEmitter.subscribe(data => {
      this.wishListBoolean = data;
    });
    this.authService.getUserDetails().subscribe(data => this.role = data.role);
    this.loadWishlist();
  }

  deleteProduct(): void {
    this.firstNameFromStorage = sessionStorage.getItem('FirstName');
    this.productService.deleteProduct(this.product.id).subscribe(value => {
      this.router.navigateByUrl('/' + (this.firstNameFromStorage).toString());
    });
  }

  addToWishlist(): void {
    this.wishlistService.addLikeToWishlist(this.product.id, Number(sessionStorage.getItem('ID')));
    this.wishListBoolean = true;
  }

  deleteFromWishlist(): void {
    this.wishlistService.deleteLikeFromWishlist(this.product.id, Number(sessionStorage.getItem('ID')));
    this.wishListBoolean = false;
  }

  private loadWishlist(): void {
    for (const num of this.wishListArr) {
      if (num === this.product.id) {
        this.wishlistService.wishlistItemEmitter.emit(true);
      }
    }
  }
}
