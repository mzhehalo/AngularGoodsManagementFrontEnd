import {Component, OnInit} from '@angular/core';
import {ProductModel} from '../../model/ProductModel';
import {ActivatedRoute} from '@angular/router';
import {WishlistService} from './wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  likedProductsFromDataBase: ProductModel[];
  wishlist: number[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.loadWishlist();
    this.likedProductsFromDataBase = this.activatedRoute.snapshot.data.WishlistProducts;
    // this.wishlistService.getAllProductsWishlist().subscribe(data => {
    //   this.likedProductsFromDataBase = data;
    // });
  }

  loadWishlist(): void {
    this.wishlistService.getLikesWishList().subscribe(wishListArr => {
      this.wishlist = wishListArr;
      this.wishlistService.wishlistQuantityEmitter.emit(wishListArr.length);
    });
  }
}
