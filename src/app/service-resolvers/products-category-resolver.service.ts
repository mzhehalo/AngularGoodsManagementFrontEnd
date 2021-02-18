import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ProductModel} from '../model/ProductModel';
import {Observable} from 'rxjs';
import {DropdownCategoriesService} from '../components/dropdown-categories/dropdown-categories.service';
import {ProductPageModel} from '../model/ProductPageModel';

@Injectable({
  providedIn: 'root'
})
export class ProductsCategoryResolverService implements Resolve<ProductPageModel> {

  constructor(private dropdownCategoriesService: DropdownCategoriesService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductPageModel> | Promise<ProductPageModel> |
    ProductPageModel
  {
    return this.dropdownCategoriesService.getProductsByCategory(route.url[0].toString(), route.url[1].toString(), 1, 6);
  }
}
