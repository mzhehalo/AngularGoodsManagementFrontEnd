import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  private baseUrl = 'http://localhost:8100';

  constructor(private http: HttpClient) { }

  pageChanging(numberOfItems: number): void {
    console.log(numberOfItems);
    this.http.get(this.baseUrl);
  }
}
