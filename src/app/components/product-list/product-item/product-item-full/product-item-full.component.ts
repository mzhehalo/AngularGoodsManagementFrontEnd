import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductModel} from '../../../../model/ProductModel';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductListComponent} from '../../product-list.component';
import {ProductService} from '../../product.service';
import {WishlistService} from '../../../wishlist/wishlist.service';
import {DomSanitizer} from '@angular/platform-browser';
import {UserService} from '../../../edit-user/user.service';
import {Subscription} from 'rxjs';
import {CartService} from '../../../cart/cart.service';
import {OrderService} from '../../../order/order.service';

@Component({
  selector: 'app-product-item-full',
  templateUrl: './product-item-full.component.html',
  styleUrls: ['./product-item-full.component.css']
})
export class ProductItemFullComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  product: ProductModel;
  role: string;
  firstName: string;
  wishListBoolean: boolean;
  wishListArr: number[];
  userId: number;

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private productList: ProductListComponent,
              private productService: ProductService,
              private router: Router,
              private wishlistService: WishlistService,
              private dom: DomSanitizer,
              private cartService: CartService,
              private orderService: OrderService
  ) {
  }

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data.Product;
    this.wishListArr = this.activatedRoute.snapshot.data.WishlistArr;
    this.firstName = this.userService.getFirstNameFromSessionStorage();
    this.userId = this.userService.getUserIdFromSessionStorage();
    this.role = this.userService.getRoleFromSessionStorage();

    this.wishlistService.wishlistItemEmitter.subscribe(data => {
      this.wishListBoolean = data;
    });
    this.loadWishlist();
    // this.subscription.add(
    //   this.wishlistService.getLikesWishList().subscribe(value =>
    //     this.wishlistService.wishlistQuantityEmitter.emit(value.length))
    // );
  }

  photoURL(imageUrl): string {
    const objectURL = 'data:image;base64,' + imageUrl;
    return this.dom.bypassSecurityTrustUrl(objectURL) as string;
  }

  addToCart(): void {
    this.subscription.add(
      this.cartService.addToCart(this.product.id).subscribe(value => {
        this.cartService.cartQuantityEmitter.emit(value.length);
      }));
  }

  deleteProduct(): void {
    this.subscription.add(
      this.productService.deleteProduct(this.product.id).subscribe(value => {
        this.router.navigateByUrl('/' + this.firstName);
      })
    );
  }

  addToWishlist(): void {
    this.subscription.add(
      this.wishlistService.addLikeToWishlist(this.product.id).subscribe(
        data => {
          this.wishlistService.wishlistQuantityEmitter.emit(data.length);
        })
    );
    this.wishListBoolean = true;
  }

  removeFromWishlist(): void {
    this.subscription.add(
      this.wishlistService.removeLikeFromWishlist(this.product.id).subscribe(
        data => {
          this.wishlistService.wishlistQuantityEmitter.emit(data.length);
        })
    );
    this.wishListBoolean = false;
  }

  private loadWishlist(): void {
    for (const num of this.wishListArr) {
      if (num === this.product.id) {
        this.wishlistService.wishlistItemEmitter.emit(true);
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
