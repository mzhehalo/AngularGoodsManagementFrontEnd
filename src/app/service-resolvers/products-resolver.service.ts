import {Injectable} from '@angular/core';
import {ProductModel} from '../model/ProductModel';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../components/login/auth.service';
import {ProductService} from '../components/product-list/product.service';
import {ProductPageModel} from '../model/ProductPageModel';

@Injectable({
  providedIn: 'root'
})
export class ProductsResolverService implements Resolve<ProductPageModel> {

  constructor(private productService: ProductService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<ProductPageModel> | Promise<ProductPageModel> | ProductPageModel {
    return this.productService.getProductDetails(1, 6);
  }

}
