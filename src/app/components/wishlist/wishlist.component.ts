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

  constructor(private activatedRoute: ActivatedRoute,
              private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.wishlistService.getAllProductsWishlist().subscribe(data => {
      this.likedProductsFromDataBase = data;
      console.log('wishlistProducts' + this.likedProductsFromDataBase);
    });
  }

}
