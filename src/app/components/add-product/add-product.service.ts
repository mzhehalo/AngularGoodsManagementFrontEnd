import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Constants} from '../../config/constants';

@Injectable({
  providedIn: 'root'
})
export class AddProductService {
  private baseUrl = Constants.API_BASE_URL + 'product/';

  constructor(private http: HttpClient,
  ) {
  }

  addProduct(formData: FormData): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const url = this.baseUrl + 'add';
    return this.http.post<any>(url, formData, {headers});
  }
}
