import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {MainComponent} from './components/main/main.component';
import {ProfileMenuComponent} from './components/profile-menu/profile-menu.component';
import {EditUserComponent} from './components/edit-user/edit-user.component';
import {LogoutComponent} from './components/logout/logout.component';
import {AuthGuard} from './guards/auth.guard';
import {UserResolverService} from './service-resolvers/user-resolver.service';
import {AddProductComponent} from './components/add-product/add-product.component';
import {ProductsResolverService} from './service-resolvers/products-resolver.service';
import {ProductItemFullComponent} from './components/product-list/product-item/product-item-full/product-item-full.component';
import {ProductResolverService} from './service-resolvers/product-resolver.service';
import {EditProductComponent} from './components/edit-product/edit-product.component';
import {WishlistResolverService} from './service-resolvers/wishlist-resolver.service';
import {WishlistComponent} from './components/wishlist/wishlist.component';
import {CartFullComponent} from './components/cart-full/cart-full.component';


const routes: Routes = [
    {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
    {path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
    {
      path: ':firstName', children: [
        {path: '', component: MainComponent, resolve: {Products: ProductsResolverService}},
        {
          path: 'full-product/:id', component: ProductItemFullComponent, resolve: {
            Product: ProductResolverService,
            WishlistArr: WishlistResolverService
          }
        },
        {
          path: 'cart/full-product/:id', component: ProductItemFullComponent, resolve: {
            Product: ProductResolverService,
            WishlistArr: WishlistResolverService
          }
        },
        {path: 'profile', component: ProfileMenuComponent},
        {path: 'edit-user', component: EditUserComponent, resolve: {User: UserResolverService}},
        {path: 'edit-product/:id', component: EditProductComponent, resolve: {Product: ProductResolverService}},
        {
          path: 'full-product/:id/edit-product', component: EditProductComponent,
          resolve: {Product: ProductResolverService},
        },
        {path: 'logout', component: LogoutComponent},
        {path: 'add-product', component: AddProductComponent},
        {path: 'wishlist', component: WishlistComponent},
        {path: 'cart', component: CartFullComponent}
      ]
    }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
