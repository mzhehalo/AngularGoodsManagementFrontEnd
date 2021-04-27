import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
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

    this.productService.getProductMinMax().subscribe(value => {
      if (value[0] === 0 && value[1] === 0) {
        sessionStorage.setItem('priceMaxPossible', String(value[1]));
        sessionStorage.setItem('priceMinPossible', String(value[0]));
      } else {
        sessionStorage.setItem('priceMaxPossible', String(value[1] + 1));
        sessionStorage.setItem('priceMinPossible', String(value[0] - 1));
      }
    });
    return this.productService.getProductDetails(1, 6, 0, 999999999);
  }

}
