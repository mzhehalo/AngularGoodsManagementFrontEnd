import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ProductModel} from '../../model/ProductModel';

@Injectable({
  providedIn: 'root'
})
export class EditProductService {
  private baseUrl = 'http://localhost:8100';
  constructor(private http: HttpClient) {
  }

  editProduct(product: ProductModel,  id: number): Observable<ProductModel> {
    const body = {product, id};
    return this.http.put<ProductModel>(this.baseUrl + '/product/edit', body);
  }
}
