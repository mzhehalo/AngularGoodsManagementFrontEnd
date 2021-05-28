import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProductModel} from '../../model/ProductModel';
import {Constants} from '../../config/constants';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private baseUrl = Constants.API_BASE_URL + 'wishlist/';

  @Output() wishlistQuantityEmitter: EventEmitter<number> = new EventEmitter();
  @Output() wishlistItemEmitter: EventEmitter<boolean> = new EventEmitter();

  constructor(private httpClient: HttpClient,
              ) {
  }

  getAllProductsWishlist(): Observable<ProductModel[]> {
    return this.httpClient.get<ProductModel[]>(this.baseUrl + 'get-products');
  }

  getLikesWishList(): Observable<number[]> {
    return this.httpClient.get<number[]>(this.baseUrl + 'get-likes');
  }

  addLikeToWishlist(productId: number): Observable<number[]> {
    return this.httpClient.post<number[]>(this.baseUrl + 'add', productId);
  }

  removeLikeFromWishlist(productId: number): Observable<number[]> {
    return this.httpClient.delete<number[]>(this.baseUrl + 'delete/' + productId);
  }
}
