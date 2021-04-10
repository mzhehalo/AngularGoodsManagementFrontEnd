import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';
import {UserModel} from '../../model/UserModel';
import {ProductModel} from '../../model/ProductModel';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private baseUrl = 'http://localhost:8100/wishlist';

  @Output() wishlistQuantityEmitter: EventEmitter<number> = new EventEmitter();
  @Output() wishlistItemEmitter: EventEmitter<boolean> = new EventEmitter();

  constructor(private http: HttpClient) {
  }

  getAllProductsWishlist(): Observable<ProductModel[]> {
    const userId = sessionStorage.getItem('ID');
    return this.http.get<ProductModel[]>(this.baseUrl + '/get-products/' + userId);
  }

  getLikesWishList(): Observable<number[]> {
    const userId = sessionStorage.getItem('ID');
    return this.http.get<number[]>(this.baseUrl + '/get-likes/' + userId);
  }

  addLikeToWishlist(productId: number, userId: number): Subscription {
    return this.http.post<UserModel>(this.baseUrl + '/add', {productId, userId}).subscribe(
      value => {
        this.getLikesWishList().subscribe(data => {
          this.wishlistQuantityEmitter.emit(data.length);
        });
      },
      error => console.log(error)
    );
  }

  deleteLikeFromWishlist(productId: number, customerId: number): void {
    this.http.delete<UserModel>(this.baseUrl + '/delete/' + customerId + '/' + productId).subscribe(
      value => {
        this.getLikesWishList().subscribe(data => {
          this.wishlistQuantityEmitter.emit(data.length);
        });
      },
      error => console.log(error)
    );
  }
}
