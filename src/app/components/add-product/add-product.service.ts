import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProductModel} from '../../model/ProductModel';
import {AuthService} from '../login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AddProductService {
  private baseUrl = 'http://localhost:8100';
  // private id;
  constructor(private httpClient: HttpClient, private authService: AuthService) {
  }

  addProduct(product: ProductModel, id: number): Observable<ProductModel> {
    // this.id = sessionStorage.getItem("FirstName");
    // this.authService.
    // console.log(product);
    console.log(product);
    console.log(id);
    return this.httpClient.post<ProductModel>(this.baseUrl + '/product/add', {product, id});
  }
}
