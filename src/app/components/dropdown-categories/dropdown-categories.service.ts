import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {ProductPageModel} from '../../model/ProductPageModel';
import {UserService} from '../edit-user/user.service';

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
              private userService: UserService
              ) {
  }

  passCategory(mainCategory: string, subCategory: string, componentName: string): void {
    if (componentName.includes('add-product') || componentName.includes('edit-product')) {
      this.mainCategoryEmitter.emit(mainCategory);
      this.subCategoryEmitter.emit(subCategory);
    } else if (componentName.includes('header')) {
      this.router.navigate([this.userService.getUserIdFromSessionStorage() + '/category/' + mainCategory + '/' + subCategory]);
    }
  }

  getProductsByCategory(mainCategory: string, subCategory: string, currentPage: number, size: number): Observable<ProductPageModel> {
    return this.http.get<ProductPageModel>(this.baseUrl + '/' + mainCategory + '/' + subCategory + '/' + currentPage + '/' + size);
  }
}
