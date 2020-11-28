import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';
import {UserModel} from '../../model/UserModel';
import {map} from 'rxjs/operators';
import {logger} from 'codelyzer/util/logger';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private baseUrl = 'http://localhost:8100';

  @Output() wishlistQuantity: EventEmitter<number> = new EventEmitter();
  constructor(private httpClient: HttpClient) {
  }

  // getWishList(): Observable<any> {
  //   return this.httpClient.get<number[]>(this.baseUrl + '/wishlist/get').pipe(
  //     map((result: any[]) => {
  //       const productIds = [];
  //
  //       result.forEach(item => productIds.push(item.id));
  //       return productIds;
  //     })
  //   );
  // }

  getWishList(): Observable<any> {
    const userId = sessionStorage.getItem('ID');
    return this.httpClient.get<number[]>(this.baseUrl + '/wishlist/get/' + userId);
  }

  addToWishlist(productId: number, customerId: number): Subscription {
    console.log('productId:' + productId + 'userId:' + customerId);
    console.log('sentsentsentsentsentsentsentsentsentsentsentsentsent');
    return this.httpClient.post<UserModel>(this.baseUrl + '/wishlist/add', {productId, customerId}).subscribe(
      value => console.log(value),
      error => console.log(error)
    );
  }

  deleteFromWishlist(productId: number, customerId: number): void {
    console.log('delete id:' + productId);
    this.httpClient.delete<UserModel>(this.baseUrl + '/wishlist/delete/' + customerId + '/' + productId).subscribe(
      value => console.log(value),
      error => console.log(error)
    );
  }
}
