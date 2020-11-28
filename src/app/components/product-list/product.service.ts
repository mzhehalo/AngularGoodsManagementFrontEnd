import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ProductModel} from '../../model/ProductModel';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8100';

  constructor(private http: HttpClient) { }

  getProductDetails(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.baseUrl + '/product/get');
  }

  getProductById(id: number): Observable<ProductModel> {
    console.log(id);
    return this.http.get<ProductModel>(this.baseUrl + '/product/get/' + id);
  }

  deleteProduct(id: number): Observable<{}> {
    return this.http.delete(this.baseUrl + '/product/delete/' + id);
  }
}
