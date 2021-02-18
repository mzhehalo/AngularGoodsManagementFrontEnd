import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {ProductPageModel} from '../../model/ProductPageModel';

@Injectable({
  providedIn: 'root'
})
export class DropdownCategoriesService {
  private baseUrl = 'http://localhost:8100/product/category';
  @Output()
  mainCategoryEmitter: EventEmitter<string> = new EventEmitter<string>();
  subCategoryEmitter: EventEmitter<string> = new EventEmitter<string>();

  constructor(private http: HttpClient,
              private router: Router,
              ) {
  }

  passCategory(mainCategory: string, subCategory: string, componentName: string): void {
    if (componentName.includes('add-product') || componentName.includes('edit-product')) {
      this.mainCategoryEmitter.emit(mainCategory);
      this.subCategoryEmitter.emit(subCategory);
    } else if (componentName.includes('header')) {
      this.router.navigate([sessionStorage.getItem('ID') + '/category/' + mainCategory + '/' + subCategory]);
    }
  }

  getProductsByCategory(mainCategory: string, subCategory: string, currentPage: number, size: number): Observable<ProductPageModel> {
    return this.http.get<ProductPageModel>(this.baseUrl + '/' + mainCategory + '/' + subCategory + '/' + currentPage + '/' + size);
  }
}
