import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ProductModel} from '../../../model/ProductModel';
import {ProductService} from '../product.service';
import {Router} from '@angular/router';
import {WishlistService} from '../../wishlist/wishlist.service';
import {CartService} from '../../cart/cart.service';
import {DomSanitizer} from '@angular/platform-browser';
import {MessengerService} from '../../../messengers/messenger.service';
import {UserService} from '../../edit-user/user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  @Input()
  product: ProductModel;
  role: string;
  @Input()
  wishListBoolean: boolean;
  userId: number;

  constructor(private userService: UserService,
              private productService: ProductService,
              private router: Router,
              private wishlistService: WishlistService,
              private cartService: CartService,
              private dom: DomSanitizer,
              private messengerService: MessengerService
  ) {
  }

  ngOnInit(): void {
    this.userId = this.userService.getUserIdFromSessionStorage();
    this.subscription.add(
      this.userService.getAuthUserDetails().subscribe(data => {
        this.role = data.role;
      }));
  }

  photoURL(imageUrl): string {
    const objectURL = 'data:image;base64,' + imageUrl;
    return this.dom.bypassSecurityTrustUrl(objectURL) as string;
  }

  addToCart(): void {
    this.subscription.add(
      this.cartService.addToCart(this.product.id).subscribe(value => {
        this.messengerService.sendMessageCart();
        this.cartService.cartQuantityEmitter.emit(value.length);
      }));
  }

  deleteProduct(): void {
    this.productService.deleteProduct(this.product.id).subscribe(value => {
      this.messengerService.sendMessageDeleteProduct(this.product.id);
    }, error => console.log(error));
  }

  addToWishlist(): void {
    this.subscription.add(
      this.wishlistService.addLikeToWishlist(this.product.id).subscribe(
        data => {
          this.wishlistService.wishlistQuantityEmitter.emit(data.length);
          this.wishListBoolean = !this.wishListBoolean;
        })
    );
  }

  removeFromWishlist(): void {
    this.subscription.add(
      this.wishlistService.removeLikeFromWishlist(this.product.id).subscribe(
        data => {
          this.wishlistService.wishlistQuantityEmitter.emit(data.length);
          this.wishListBoolean = !this.wishListBoolean;
        })
    );
  }

  isOrderFullRoute(): boolean {
    return this.router.url.includes('orders/full-order/');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
