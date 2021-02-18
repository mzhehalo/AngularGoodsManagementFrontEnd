import {EventEmitter, Injectable, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {ProductModel} from '../../model/ProductModel';
import {HttpClient} from '@angular/common/http';
import {ProductPageModel} from '../../model/ProductPageModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8100/product';

  constructor(private http: HttpClient) {
  }

  getProductDetails(currentPage: number, size: number): Observable<ProductPageModel> {
    return this.http.get<ProductPageModel>(this.baseUrl + '/get/' + currentPage + '/' + size);
  }

  getProductById(id: number): Observable<ProductModel> {
    return this.http.get<ProductModel>(this.baseUrl + '/get/' + id);
  }

  deleteProduct(id: number): Observable<{}> {
    return this.http.delete(this.baseUrl + '/delete/' + id);
  }
}
