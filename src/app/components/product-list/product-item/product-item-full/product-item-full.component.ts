import {Component, OnInit} from '@angular/core';
import {ProductModel} from '../../../../model/ProductModel';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductListComponent} from '../../product-list.component';
import {ProductService} from '../../product.service';
import {WishlistService} from '../../../wishlist/wishlist.service';
import {DomSanitizer} from '@angular/platform-browser';
import {UserService} from '../../../edit-user/user.service';

@Component({
  selector: 'app-product-item-full',
  templateUrl: './product-item-full.component.html',
  styleUrls: ['./product-item-full.component.css']
})
export class ProductItemFullComponent implements OnInit {
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
              private dom: DomSanitizer
  ) {
    this.product = this.activatedRoute.snapshot.data.Product;
    this.wishListArr = this.activatedRoute.snapshot.data.WishlistArr;
  }

  ngOnInit(): void {
    this.userId = this.userService.getUserIdFromSessionStorage();
    this.firstName = this.userService.getFirstNameFromSessionStorage();

    this.wishlistService.wishlistItemEmitter.subscribe(data => {
      this.wishListBoolean = data;
    });
    this.userService.getUserDetails(this.userId).subscribe(data => this.role = data.role);
    this.loadWishlist();
  }

  photoURL(imageUrl): string {
    const objectURL = 'data:image;base64,' + imageUrl;
    return this.dom.bypassSecurityTrustUrl(objectURL) as string;
  }

  deleteProduct(): void {
    this.productService.deleteProduct(this.product.id).subscribe(value => {
      this.router.navigateByUrl('/' + this.firstName);
    });
  }

  addToWishlist(): void {
    this.wishlistService.addLikeToWishlist(this.product.id, this.userId);
    this.wishListBoolean = true;
  }

  deleteFromWishlist(): void {
    this.wishlistService.deleteLikeFromWishlist(this.product.id, this.userId);
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
