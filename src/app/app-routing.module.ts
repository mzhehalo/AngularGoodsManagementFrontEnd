import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
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
import {UsersResolverService} from './service-resolvers/users-resolver.service';
import {StatisticsResolverService} from './service-resolvers/statistics-resolver.service';
import {UserRoles} from './model/user-roles.enum';


const routes: Routes = [
    {
      path: '', component: MainComponent,
      resolve: {Products: ProductsResolverService},
      data: {userRoles: [UserRoles.CUSTOMER, UserRoles.SELLER, UserRoles.ADMIN]},
      canActivate: [AuthGuard]
    },
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {
      path: ':firstName', children: [
        {path: '', component: MainComponent, resolve: {Products: ProductsResolverService}},
        {
          path: 'category', children: [
            {
              path: ':mainCategory/:subCategory', component: MainComponent,
              resolve: {CategoryProducts: ProductsCategoryResolverService}
            },
          ],
          data: {userRoles: [UserRoles.CUSTOMER, UserRoles.SELLER, UserRoles.ADMIN]},
          canActivate: [AuthGuard]
        },
        {
          path: 'full-product/:id', component: ProductItemFullComponent, resolve: {
            Product: ProductResolverService,
            WishlistArr: WishlistResolverService
          },
          data: {userRoles: [UserRoles.CUSTOMER, UserRoles.SELLER, UserRoles.ADMIN]},
          canActivate: [AuthGuard]
        },
        {
          path: 'category/:mainCategory/:subCategory/full-product/:id', component: ProductItemFullComponent, resolve: {
            Product: ProductResolverService,
            WishlistArr: WishlistResolverService
          },
          data: {userRoles: [UserRoles.CUSTOMER, UserRoles.SELLER, UserRoles.ADMIN]},
          canActivate: [AuthGuard]
        },
        {
          path: 'category/:mainCategory/:subCategory/edit-product/:id', component: EditProductComponent, resolve: {
            Product: ProductResolverService
          },
          data: {userRoles: [UserRoles.SELLER, UserRoles.ADMIN]},
          canActivate: [AuthGuard]
        },
        {
          path: 'category/:mainCategory/:subCategory/full-product/:id/edit-product', component: EditProductComponent, resolve: {
            Product: ProductResolverService
          },
          data: {userRoles: [UserRoles.SELLER, UserRoles.ADMIN]},
          canActivate: [AuthGuard]
        },
        {
          path: 'cart/full-product/:id', component: ProductItemFullComponent, resolve: {
            Product: ProductResolverService,
            WishlistArr: WishlistResolverService
          },
          data: {userRoles: [UserRoles.CUSTOMER]},
          canActivate: [AuthGuard]
        },
        {
          path: 'wishlist/full-product/:id', component: ProductItemFullComponent, resolve: {
            Product: ProductResolverService,
            WishlistArr: WishlistResolverService,
          },
          data: {userRoles: [UserRoles.CUSTOMER]},
          canActivate: [AuthGuard]
        },
        {path: 'profile', component: ProfileMenuComponent,
          data: {userRoles: [UserRoles.CUSTOMER, UserRoles.SELLER, UserRoles.ADMIN]},
          canActivate: [AuthGuard]
        },
        {path: 'edit-user/:userId', component: EditUserComponent, resolve: {User: UserResolverService},
          data: {userRoles: [UserRoles.CUSTOMER, UserRoles.SELLER, UserRoles.ADMIN]},
          canActivate: [AuthGuard]
        },
        {
          path: 'edit-product/:id',
          component: EditProductComponent,
          resolve: {Product: ProductResolverService},
          data: {
            userRoles: [UserRoles.SELLER, UserRoles.ADMIN]
          },
          canActivate: [AuthGuard]
        },
        {
          path: 'full-product/:id/edit-product', component: EditProductComponent,
          resolve: {Product: ProductResolverService},
          data: {
            userRoles: [UserRoles.SELLER, UserRoles.ADMIN]
          },
          canActivate: [AuthGuard]
        },
        {
          path: 'add-product',
          component: AddProductComponent,
          data: {
            userRoles: [UserRoles.SELLER, UserRoles.ADMIN]
          },
          canActivate: [AuthGuard]
        },
        {
          path: 'wishlist', component: WishlistComponent,
          resolve: {WishlistProducts: WishlistProductsResolverService},
          data: {userRoles: [UserRoles.CUSTOMER]},
          canActivate: [AuthGuard]
        },
        {
          path: 'cart', component: CartFullComponent,
          data: {userRoles: [UserRoles.CUSTOMER]},
          canActivate: [AuthGuard]
        },
        {
          path: 'orders', component: OrderComponent, resolve: {
            Orders: OrdersResolverService
          },
          data: {userRoles: [UserRoles.SELLER]},
          canActivate: [AuthGuard]
        },
        {
          path: 'orders/full-order/:orderId', component: OrderItemFullComponent, resolve: {
            Order: OrderResolverService
          },
          data: {
            userRoles: [UserRoles.SELLER, UserRoles.CUSTOMER]
          },
          canActivate: [AuthGuard]
        },
        {
          path: 'edit/categories', component: EditCategoriesComponent,
          data: {userRoles: [UserRoles.ADMIN]},
          canActivate: [AuthGuard]
        },
        {
          path: 'statistics', component: StatisticsComponent, resolve: {
            Statistics: StatisticsResolverService
          },
          data: {
            userRoles: [UserRoles.SELLER, UserRoles.ADMIN]
          },
          canActivate: [AuthGuard]
        },
        {
          path: 'edit/users', component: EditUsersComponent, resolve: {
            Users: UsersResolverService
          },
          data: {userRoles: [UserRoles.ADMIN]},
          canActivate: [AuthGuard]
        },
        {
          path: 'edit/users/register', component: RegisterComponent,
          data: {userRoles: [UserRoles.ADMIN]},
          canActivate: [AuthGuard]
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
