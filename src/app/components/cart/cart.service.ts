import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CartModel} from '../../model/CartModel';
import {MessengerService} from '../../messengers/messenger.service';
import {Constants} from '../../config/constants';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = Constants.API_BASE_URL;
  @Output() cartQuantityEmitter: EventEmitter<number> = new EventEmitter();
  cartItemEmptiness: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private http: HttpClient,
              private message: MessengerService
  ) {}

  addToCart(userId: number, productId: number): void {
    this.http.post(this.baseUrl + 'cart/add', {userId, productId}).subscribe(value => {
      this.message.sendMessageCart();
    });
  }

  getCartProducts(userId: number): Observable<CartModel[]>{
    return this.http.get<CartModel[]>(this.baseUrl + 'cart/get/' + userId);
  }

  deleteFromCart(userId: number, productId: number): Observable<any> {
   return this.http.delete(this.baseUrl + 'cart/delete/' + userId + '/' + productId);
  }
}
