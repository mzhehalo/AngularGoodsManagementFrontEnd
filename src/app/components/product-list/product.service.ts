import {EventEmitter, Injectable, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {ProductModel} from '../../model/ProductModel';
import {HttpClient} from '@angular/common/http';
import {logger} from 'codelyzer/util/logger';
import {ProductPageModel} from '../../model/ProductPageModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8100/product';

  constructor(private http: HttpClient) {
  }

  getProductDetails(currentPage: number, size: number): Observable<ProductPageModel> {
    return this.http.get<any>(this.baseUrl + '/get/' + currentPage + '/' + size);
  }

  getProductById(id: number): Observable<ProductModel> {
    console.log(id);
    return this.http.get<ProductModel>(this.baseUrl + '/get/' + id);
  }

  deleteProduct(id: number): Observable<{}> {
    console.log('controlllllllllllllllllllllllller');
    return this.http.delete(this.baseUrl + '/delete/' + id);
  }
}
