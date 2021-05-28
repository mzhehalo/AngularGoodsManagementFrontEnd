import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ProductModel} from '../../model/ProductModel';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ProductPageModel} from '../../model/ProductPageModel';
import {Constants} from '../../config/constants';
import {MinMaxModel} from '../../model/min-max-model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = Constants.API_BASE_URL + 'product/';

  constructor(private httpClient: HttpClient) {
  }

  getProductDetails(currentPage: number, size: number, priceMin: number, priceMax: number): Observable<ProductPageModel> {
    return this.httpClient.get<ProductPageModel>(this.baseUrl + 'get/' + currentPage + '/' + size +
      '/' + priceMin + '/' + priceMax);
  }

  getProductMinMax(mainCategory: string,
                   subCategory: string): Observable<MinMaxModel> {
    return this.httpClient.get<MinMaxModel>(this.baseUrl + 'get/min/max/' + mainCategory + '/' + subCategory);
  }

  getProductById(productId: number): Observable<ProductModel> {
    return this.httpClient.get<ProductModel>(this.baseUrl + 'get/' + productId);
  }

  editProduct(formData: FormData): Observable<ProductModel> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.httpClient.put<any>(this.baseUrl + 'edit', formData, {headers});
  }

  addProduct(formData: FormData): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const url = this.baseUrl + 'add';
    return this.httpClient.post<any>(url, formData, {headers});
  }

  deleteProduct(productId: number): Observable<{}> {
    return this.httpClient.delete(this.baseUrl + 'delete/' + productId);
  }
}
