import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from '../../../model/ProductModel';
import {AuthService} from '../../login/auth.service';
import {ProductService} from '../product.service';
import {Router} from '@angular/router';
import {WishlistService} from '../../wishlist/wishlist.service';
import {CartService} from '../../cart/cart.service';
import {DomSanitizer} from '@angular/platform-browser';
import {MessengerService} from '../../../messengers/messenger.service';

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

  constructor(private authService: AuthService,
              private productService: ProductService,
              private router: Router,
              private wishlistService: WishlistService,
              private cartService: CartService,
              private dom: DomSanitizer,
              private messengerService: MessengerService
  ) {}

  ngOnInit(): void {
    this.authService.getUserDetails().subscribe(data => {
      this.role = data.role;
    });
  }

  photoURL(imageUrl): string {
    const objectURL = 'data:image;base64,' + imageUrl;
    return this.dom.bypassSecurityTrustUrl(objectURL) as string;
  }

  addToCart(): void {
    this.cartService.addToCart(Number(sessionStorage.getItem('ID')), this.product.id);
  }

  deleteProduct(): void {
    this.productService.deleteProduct(this.product.id).subscribe(value => {
      this.messengerService.sendMessageDeleteProduct(this.product.id);
    }, error => console.log(error));
  }

  addToWishlist(): void {
    this.wishlistService.addLikeToWishlist(this.product.id, Number(sessionStorage.getItem('ID')));
    this.wishListBoolean = !this.wishListBoolean;
  }

  deleteFromWishlist(): void {
    this.wishlistService.deleteLikeFromWishlist(this.product.id, Number(sessionStorage.getItem('ID')));
    this.wishListBoolean = !this.wishListBoolean;
  }

  isOrderFullRoute(): boolean {
    return this.router.url.includes('orders/full-order/');
  }
}
