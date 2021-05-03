import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ProductModel} from '../../model/ProductModel';
import {Constants} from '../../config/constants';

@Injectable({
  providedIn: 'root'
})
export class EditProductService {
  private baseUrl = Constants.API_BASE_URL + 'product/';

  constructor(private http: HttpClient) {
  }

  editProduct(formData: FormData): Observable<ProductModel> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.put<any>(this.baseUrl + 'edit', formData, {headers});
  }
}
