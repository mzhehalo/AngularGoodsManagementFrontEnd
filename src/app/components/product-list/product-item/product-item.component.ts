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
import {MessengerService} from '../messenger.service';
import {CartService} from '../../cart/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input()
  product: ProductModel;
  role: string;
  @Input()
  wishListBoolean: boolean;

  // faHeart = faHeart;
  constructor(private authService: AuthService,
              private productService: ProductService,
              private router: Router,
              private productList: ProductListComponent,
              private wishlistService: WishlistService,
              private cartService: CartService
  ) {}

  ngOnInit(): void {
    console.log(this.product);
    this.authService.getUserDetails().subscribe(data => {
      this.role = data.role;
    });
  }

  addToCart(): void {
    this.cartService.addToCart(Number(sessionStorage.getItem('ID')), this.product.id);
  }

  deleteProduct(): void {
    this.productList.deleteProductById(this.product.id);
    this.productService.deleteProduct(this.product.id);
  }

  addToWishlist(): void {
    this.wishlistService.addLikeToWishlist(this.product.id, Number(sessionStorage.getItem('ID')));
    this.wishListBoolean = !this.wishListBoolean;
  }

  deleteFromWishlist(): void {
    this.wishlistService.deleteLikeFromWishlist(this.product.id, Number(sessionStorage.getItem('ID')));
    this.wishListBoolean = !this.wishListBoolean;
  }
}
