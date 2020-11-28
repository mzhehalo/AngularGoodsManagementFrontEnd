import {Injectable} from '@angular/core';
import {ProductModel} from '../model/ProductModel';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../components/login/auth.service';
import {ProductService} from '../components/product-list/product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsResolverService implements Resolve<ProductModel[]> {

  constructor(private productService: ProductService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductModel[]> | Promise<ProductModel[]> | ProductModel[]
  {
    return this.productService.getProductDetails();
  }

}
