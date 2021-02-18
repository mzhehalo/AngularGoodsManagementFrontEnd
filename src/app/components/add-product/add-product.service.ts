import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProductModel} from '../../model/ProductModel';

@Injectable({
  providedIn: 'root'
})
export class AddProductService {
  private baseUrl = 'http://localhost:8100';

  constructor(private http: HttpClient,
  ) {
  }
  addProduct(product: ProductModel, sellerId: number): Observable<ProductModel> {
    return this.http.post<ProductModel>(this.baseUrl + '/product/add', {product, id: sellerId});
  }

}
