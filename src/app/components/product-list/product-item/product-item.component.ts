import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from '../../../model/ProductModel';
import {AuthService} from '../../login/auth.service';
import {faHeart} from '@fortawesome/free-solid-svg-icons';
import {ProductService} from '../product.service';
import {Router} from '@angular/router';
import {stringify} from '@angular/compiler/src/util';
import {ProductListComponent} from '../product-list.component';
import {WishlistService} from '../../wishlist/wishlist.service';
import {toNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input()
  product: ProductModel;
  role: string;
  firstNameFromStorage: string;
  @Input()
  wishListBoolean: boolean;

  // faHeart = faHeart;
  constructor(private authService: AuthService,
              private productService: ProductService,
              private router: Router,
              private productList: ProductListComponent,
              private wishlistService: WishlistService
  ) {
  }

  ngOnInit(): void {
    console.log(this.product);
    this.authService.getUserDetails().subscribe(data => {
      this.role = data.role;
    });
  }

  deleteProduct(): void {
    this.productList.deleteProductById(this.product.id);
    // this.firstNameFromStorage = sessionStorage.getItem('FirstName');
    // console.log('Delete');
    this.productService.deleteProduct(this.product.id).subscribe(value => {
      // this.router.navigateByUrl('/' + stringify(this.product.id));
      console.log(value);
      // this.ngOnInit();
    });
  }

  // change(): void {
  //   console.log(this.wishListBoolean);
  //   this.wishListBoolean = !this.wishListBoolean;
  // }

  addToWishlist(): void {
    this.wishlistService.addLikeToWishlist(this.product.id, Number(sessionStorage.getItem('ID')));
    this.wishListBoolean = !this.wishListBoolean;
  }

  deleteFromWishlist(): void {
    this.wishlistService.deleteLikeFromWishlist(this.product.id, Number(sessionStorage.getItem('ID')));
    this.wishListBoolean = !this.wishListBoolean;
  }
}
