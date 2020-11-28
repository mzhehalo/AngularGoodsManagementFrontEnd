import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {WishlistService} from '../components/wishlist/wishlist.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistResolverService implements Resolve<number[]> {

  constructor(private wishlistService: WishlistService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<number[]> | Promise<number[]> | number[] {
     return this.wishlistService.getLikesWishList();
  }
}
