import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';
import {UserModel} from '../../model/UserModel';
import {ProductModel} from '../../model/ProductModel';
import {UserService} from '../edit-user/user.service';
import {Constants} from '../../config/constants';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private baseUrl = Constants.API_BASE_URL + 'wishlist/';

  @Output() wishlistQuantityEmitter: EventEmitter<number> = new EventEmitter();
  @Output() wishlistItemEmitter: EventEmitter<boolean> = new EventEmitter();

  constructor(private httpClient: HttpClient,
              private userService: UserService
              ) {
  }

  getAllProductsWishlist(): Observable<ProductModel[]> {
    return this.httpClient.get<ProductModel[]>(this.baseUrl + 'get-products/' + this.userService.getUserIdFromSessionStorage());
  }

  getLikesWishList(): Observable<number[]> {
    return this.httpClient.get<number[]>(this.baseUrl + 'get-likes/' + this.userService.getUserIdFromSessionStorage());
  }

  addLikeToWishlist(productId: number, userId: number): Subscription {
    return this.httpClient.post<UserModel>(this.baseUrl + 'add', {productId, userId}).subscribe(
      value => {
        this.getLikesWishList().subscribe(data => {
          this.wishlistQuantityEmitter.emit(data.length);
        });
      },
      error => console.log(error)
    );
  }

  deleteLikeFromWishlist(productId: number, customerId: number): void {
    this.httpClient.delete<UserModel>(this.baseUrl + 'delete/' + customerId + '/' + productId).subscribe(
      value => {
        this.getLikesWishList().subscribe(data => {
          this.wishlistQuantityEmitter.emit(data.length);
        });
      },
      error => console.log(error)
    );
  }
}
