import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CartModel} from '../../model/CartModel';
import {Constants} from '../../config/constants';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = Constants.API_BASE_URL + 'cart/';
  @Output() cartQuantityEmitter: EventEmitter<number> = new EventEmitter();

  constructor(private http: HttpClient) {}

  addToCart(productId: number): Observable<CartModel[]> {
    return this.http.post<CartModel[]>(this.baseUrl + 'add/', productId);
  }

  getCartProducts(): Observable<CartModel[]>{
    return this.http.get<CartModel[]>(this.baseUrl + 'get');
  }

  deleteFromCart(productId: number): Observable<any> {
   return this.http.delete(this.baseUrl + 'delete/' + productId);
  }
}
