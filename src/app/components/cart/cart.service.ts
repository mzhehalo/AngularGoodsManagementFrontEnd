import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';
import {ProductModel} from '../../model/ProductModel';
import {CartModel} from '../../model/CartModel';
import {MessengerService} from '../product-list/messenger.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'http://localhost:8100/cart';
  @Output() cartQuantityEmitter: EventEmitter<number> = new EventEmitter();

  constructor(private http: HttpClient,
              private message: MessengerService
  ) {}

  addToCart(userId: number, productId: number): void {
    console.log('userId: ' + userId + 'productId: ' + productId);
    this.http.post(this.baseUrl + '/add', {userId, productId}).subscribe(value => {
      this.message.sendMessage();
      console.log(value);
    });
  }

  getCartProducts(userId: number): Observable<CartModel[]>{
    console.log('getCartProducts///////////' + userId);
    return this.http.get<CartModel[]>(this.baseUrl + '/get/' + userId);
  }

  deleteFromCart(userId: number, productId: number): Observable<any> {
   return this.http.delete(this.baseUrl + '/delete/' + userId + '/' + productId);
  }
}
