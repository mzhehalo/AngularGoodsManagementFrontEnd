import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MainComponent} from './components/main/main.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthGuard} from './guards/auth.guard';
import {ProfileMenuComponent} from './components/profile-menu/profile-menu.component';
import {EditUserComponent} from './components/edit-user/edit-user.component';
import {HeaderComponent} from './components/header/header.component';
import {MyAutoFocusDirective} from './directive/my-auto-focus.directive';
import {HttpInterceptorService} from './httpInterceptor.service';
import {LogoutComponent} from './components/logout/logout.component';
import {AddProductComponent} from './components/add-product/add-product.component';
import {FooterComponent} from './components/footer/footer.component';
import {FiltersComponent} from './components/filters/filters.component';
import {ProductListComponent} from './components/product-list/product-list.component';
import {CartComponent} from './components/cart/cart.component';
import {CartItemComponent} from './components/cart/cart-item/cart-item.component';
import {ProductItemComponent} from './components/product-list/product-item/product-item.component';
import {ProductItemFullComponent} from './components/product-list/product-item/product-item-full/product-item-full.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {EditProductComponent} from './components/edit-product/edit-product.component';
import {WishlistComponent} from './components/wishlist/wishlist.component';
import {WrapperComponent} from './components/wrapper/wrapper.component';
import {CartFullComponent} from './components/cart-full/cart-full.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {OrderComponent} from './components/order/order.component';
import {OrderListComponent} from './components/order/order-list/order-list.component';
import {OrderItemComponent} from './components/order/order-list/order-item/order-item.component';
import {OrderItemFullComponent} from './components/order/order-list/order-item/order-item-full/order-item-full.component';
import {DropdownCategoriesComponent} from './components/dropdown-categories/dropdown-categories.component';
import {ProductListByCategoryComponent} from './components/product-list-by-category/product-list-by-category.component';
import { EditCategoriesComponent } from './components/edit-categories/edit-categories.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { EditUsersComponent } from './components/edit-users/edit-users.component';
import {MatTableModule} from '@angular/material/table';
import { DialogBoxComponent } from './components/edit-categories/dialog-box/dialog-box.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import {ConfirmationDialogService} from './components/confirmation-dialog/confirmation-dialog.service';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent,
    ProfileMenuComponent,
    EditUserComponent,
    HeaderComponent,
    MyAutoFocusDirective,
    LogoutComponent,
    AddProductComponent,
    FooterComponent,
    FiltersComponent,
    ProductListComponent,
    CartComponent,
    CartItemComponent,
    ProductItemComponent,
    ProductItemFullComponent,
    EditProductComponent,
    WishlistComponent,
    WrapperComponent,
    CartFullComponent,
    OrderComponent,
    OrderListComponent,
    OrderItemComponent,
    OrderItemFullComponent,
    DropdownCategoriesComponent,
    ProductListByCategoryComponent,
    EditCategoriesComponent,
    StatisticsComponent,
    EditUsersComponent,
    DialogBoxComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgxPaginationModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  entryComponents: [DialogBoxComponent, ConfirmationDialogComponent],
  providers: [AuthGuard, LoginComponent, ProductListComponent, {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true
  },
    ConfirmationDialogService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
