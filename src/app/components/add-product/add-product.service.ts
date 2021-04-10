import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddProductService {
  private baseUrl = 'http://localhost:8100/product';

  constructor(private http: HttpClient,
  ) {
  }

  addProduct(formData: FormData): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const url = this.baseUrl + '/add';
    return this.http.post<any>(url, formData, {headers});
  }
}
