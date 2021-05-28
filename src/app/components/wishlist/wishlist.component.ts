import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductModel} from '../../model/ProductModel';
import {ActivatedRoute} from '@angular/router';
import {WishlistService} from './wishlist.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  likedProductsFromDataBase: ProductModel[];
  wishlist: number[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private wishlistService: WishlistService
  ) {
  }

  ngOnInit(): void {
    this.loadWishlist();
    this.loadLikes();
    this.likedProductsFromDataBase = this.activatedRoute.snapshot.data.WishlistProducts;
  }

  loadWishlist(): void {
  }

  loadLikes(): void {
    this.subscription.add(
      this.wishlistService.getLikesWishList().subscribe(wishListArr => {
        this.wishlist = wishListArr;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
