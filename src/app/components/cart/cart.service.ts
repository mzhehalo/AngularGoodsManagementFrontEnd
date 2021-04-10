import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CartModel} from '../../model/CartModel';
import {MessengerService} from '../../messengers/messenger.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'http://localhost:8100/cart';
  @Output() cartQuantityEmitter: EventEmitter<number> = new EventEmitter();
  cartItemEmptiness: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private http: HttpClient,
              private message: MessengerService
  ) {}

  addToCart(userId: number, productId: number): void {
    this.http.post(this.baseUrl + '/add', {userId, productId}).subscribe(value => {
      this.message.sendMessageCart();
    });
  }

  getCartProducts(userId: number): Observable<CartModel[]>{
    return this.http.get<CartModel[]>(this.baseUrl + '/get/' + userId);
  }

  deleteFromCart(userId: number, productId: number): Observable<any> {
   return this.http.delete(this.baseUrl + '/delete/' + userId + '/' + productId);
  }
}
