import { Injectable } from '@angular/core';
import {ProductModel} from '../model/ProductModel';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {logger} from 'codelyzer/util/logger';
import {ProductService} from '../components/product-list/product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<ProductModel>{
  constructor(private productService: ProductService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductModel> | Promise<ProductModel> | ProductModel {
    console.log(route.params.id);
    return this.productService.getProductById(route.params.id);
  }
}
