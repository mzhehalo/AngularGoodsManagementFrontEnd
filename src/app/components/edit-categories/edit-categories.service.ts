import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MainCategoryModel} from '../../model/main-category-model';
import {Constants} from '../../config/constants';

@Injectable({
  providedIn: 'root'
})
export class EditCategoriesService {

  private baseUrl = Constants.API_BASE_URL + 'categories';

  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<MainCategoryModel[]> {
    return this.http.get<MainCategoryModel[]>(this.baseUrl + '/get');
  }

  addMainCategory(mainCategory): Observable<MainCategoryModel[]> {
    return this.http.post<MainCategoryModel[]>(this.baseUrl + '/add/main', {mainCategory});
  }

  addSubCategory(idMain, subCategory): Observable<MainCategoryModel[]> {
    return this.http.post<MainCategoryModel[]>(this.baseUrl + '/add/sub/' + idMain, {idMain, subCategory});
  }

  updateMainCategory(id, mainCategory): Observable<any> {
    return this.http.put(this.baseUrl + '/update/main/', {id, mainCategory});
  }

  updateSubCategory(id, subCategory): Observable<any> {
    return this.http.put(this.baseUrl + '/update/sub/', {id, subCategory});
  }

  deleteMainCategory(id): Observable<any> {
    return this.http.delete(this.baseUrl + '/delete/main/' + id);
  }

  deleteSubCategory(id): Observable<any> {
    return this.http.delete(this.baseUrl + '/delete/sub/' + id);
  }
}
