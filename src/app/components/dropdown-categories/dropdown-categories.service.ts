import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {ProductPageModel} from '../../model/ProductPageModel';
import {UserService} from '../edit-user/user.service';
import {Constants} from '../../config/constants';

@Injectable({
  providedIn: 'root'
})
export class DropdownCategoriesService {
  private baseUrl = Constants.API_BASE_URL + 'product/';
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
      this.router.navigate([this.userService.getFirstNameFromSessionStorage() + '/category/' + mainCategory + '/' + subCategory]);
    }
  }

  getProductsByCategory(mainCategory: string, subCategory: string, currentPage: number, size: number, priceMin: number, priceMax: number):
    Observable<ProductPageModel> {
    return this.http.get<ProductPageModel>(this.baseUrl + 'category/' + mainCategory + '/' + subCategory +
      '/' + currentPage + '/' + size + '/' + priceMin + '/' + priceMax);
  }
}
