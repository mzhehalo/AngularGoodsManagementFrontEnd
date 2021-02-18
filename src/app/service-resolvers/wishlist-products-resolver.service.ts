import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ProductModel} from '../model/ProductModel';
import {Observable} from 'rxjs';
import {WishlistService} from '../components/wishlist/wishlist.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistProductsResolverService implements Resolve<ProductModel[]> {

  constructor(private wishlistService: WishlistService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductModel[]> | Promise<ProductModel[]> | ProductModel[]
  {
    return this.wishlistService.getAllProductsWishlist();
  }
}
