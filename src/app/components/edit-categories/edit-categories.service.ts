import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CategoryModel} from '../../model/category-model';

@Injectable({
  providedIn: 'root'
})
export class EditCategoriesService {

  private baseUrl = 'http://localhost:8100/categories';

  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(this.baseUrl + '/get');
  }

  addCategories(mainCategory, subCategory): Observable<CategoryModel[]> {
    return this.http.post<CategoryModel[]>(this.baseUrl + '/add', {mainCategory, subCategory});
  }

  updateCategories(id, mainCategory, subCategory): Observable<any> {
    return this.http.put(this.baseUrl + '/update', {id, mainCategory, subCategory});
  }

  deleteCategories(id): Observable<any> {
   return this.http.delete(this.baseUrl + '/delete/' + id);
  }

}
