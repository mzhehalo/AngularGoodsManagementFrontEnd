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
import {OrderComponent} from './components/order/order.component';
import {OrdersResolverService} from './service-resolvers/orders-resolver.service';
import {OrderItemFullComponent} from './components/order/order-list/order-item/order-item-full/order-item-full.component';
import {OrderResolverService} from './service-resolvers/order-resolver.service';
import {ProductsCategoryResolverService} from './service-resolvers/products-category-resolver.service';
import {WishlistProductsResolverService} from './service-resolvers/wishlist-products-resolver.service';
import {EditCategoriesComponent} from './components/edit-categories/edit-categories.component';
import {StatisticsComponent} from './components/statistics/statistics.component';
import {EditUsersComponent} from './components/edit-users/edit-users.component';


const routes: Routes = [
    {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
    {path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
    {
      path: ':firstName', children: [
        {path: '', component: MainComponent, resolve: {Products: ProductsResolverService}},
        {path: 'category', children: [
            {path: ':mainCategory/:subCategory', component: MainComponent,
              resolve: {CategoryProducts: ProductsCategoryResolverService}},
          ]},
        {
          path: 'full-product/:id', component: ProductItemFullComponent, resolve: {
            Product: ProductResolverService,
            WishlistArr: WishlistResolverService
          }
        },
        {
          path: 'category/:mainCategory/:subCategory/full-product/:id', component: ProductItemFullComponent, resolve: {
            Product: ProductResolverService,
            WishlistArr: WishlistResolverService
          }
        },
        {
          path: 'category/:mainCategory/:subCategory/edit-product/:id', component: EditProductComponent, resolve: {
            Product: ProductResolverService
          }
        },
        {
          path: 'category/:mainCategory/:subCategory/full-product/:id/edit-product', component: EditProductComponent, resolve: {
            Product: ProductResolverService
          }
        },
        {
          path: 'cart/full-product/:id', component: ProductItemFullComponent, resolve: {
            Product: ProductResolverService,
            WishlistArr: WishlistResolverService
          }
        },
        {
          path: 'wishlist/full-product/:id', component: ProductItemFullComponent, resolve: {
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
        {path: 'wishlist', component: WishlistComponent, resolve: {WishlistProducts: WishlistProductsResolverService}},
        {path: 'cart', component: CartFullComponent},
        {
          path: 'orders', component: OrderComponent, resolve: {
            Orders: OrdersResolverService
          }
        },
        {
          path: 'orders/full-order/:orderId', component: OrderItemFullComponent, resolve: {
            Order: OrderResolverService
          }
        },
        {
          path: 'edit/categories', component: EditCategoriesComponent
        },
        {
          path: 'statistics', component: StatisticsComponent
        },
        {
          path: 'edit/users', component: EditUsersComponent
        }
      ],
    }
  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
