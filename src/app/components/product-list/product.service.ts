import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ProductModel} from '../../model/ProductModel';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ProductPageModel} from '../../model/ProductPageModel';
import {Constants} from '../../config/constants';

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

  getProductMinMax(): Observable<number[]> {
    return this.httpClient.get<number[]>(this.baseUrl + 'get/min/max');
  }

  getProductById(id: number): Observable<ProductModel> {
    return this.httpClient.get<ProductModel>(this.baseUrl + 'get/' + id);
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

  deleteProduct(id: number): Observable<{}> {
    return this.httpClient.delete(this.baseUrl + 'delete/' + id);
  }
}
