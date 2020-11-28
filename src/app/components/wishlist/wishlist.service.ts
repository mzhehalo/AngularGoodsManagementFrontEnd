import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';
import {UserModel} from '../../model/UserModel';
import {map} from 'rxjs/operators';
import {logger} from 'codelyzer/util/logger';
import {Router} from '@angular/router';
import {dateComparator} from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-tools';
import {ProductModel} from '../../model/ProductModel';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private baseUrl = 'http://localhost:8100/wishlist';

  @Output() wishlistArrLengthEmitter: EventEmitter<number> = new EventEmitter();
  @Output() wishlistItemEmitter: EventEmitter<boolean> = new EventEmitter();

  constructor(private httpClient: HttpClient) {
  }

  getAllProductsWishlist(): Observable<ProductModel[]> {
    const userId = sessionStorage.getItem('ID');
    return this.httpClient.get<ProductModel[]>(this.baseUrl + '/get-products/' + userId);
  }

  getLikesWishList(): Observable<number[]> {
    const userId = sessionStorage.getItem('ID');
    return this.httpClient.get<number[]>(this.baseUrl + '/get-likes/' + userId);
  }

  addLikeToWishlist(productId: number, customerId: number): Subscription {
    console.log('productId:' + productId + 'userId:' + customerId);
    console.log('sentsentsentsentsentsentsentsentsentsentsentsentsent');
    return this.httpClient.post<UserModel>(this.baseUrl + '/add', {productId, customerId}).subscribe(
      value => {
        console.log(value);
        this.getLikesWishList().subscribe(data => {
          this.wishlistArrLengthEmitter.emit(data.length);
          console.log('add---: ' + data.length);
        });
      },
      error => console.log(error)
    );
  }

  deleteLikeFromWishlist(productId: number, customerId: number): void {
    console.log('delete id:' + productId);
    this.httpClient.delete<UserModel>(this.baseUrl + '/delete/' + customerId + '/' + productId).subscribe(
      value => {
        console.log(value);
        this.getLikesWishList().subscribe(data => {
          this.wishlistArrLengthEmitter.emit(data.length);
          console.log('delete---: ' + data.length);
        });
      },
      error => console.log(error)
    );
  }
}
