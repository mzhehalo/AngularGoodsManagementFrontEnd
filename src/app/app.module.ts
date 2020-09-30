import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MainComponent} from './components/main/main.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {ReactiveFormsModule} from '@angular/forms';
import {UserComponent} from './components/user/user.component';
import {HttpClientModule} from '@angular/common/http';
import {LoginGuard} from './guards/login.guard';
import {ProfileMenuComponent} from './components/profile-menu/profile-menu.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { HeaderComponent } from './components/header/header.component';
import { MyAutoFocusDirective } from './directive/my-auto-focus.directive';
import {User2Component} from './components/user2/user2.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    User2Component,
    ProfileMenuComponent,
    EditUserComponent,
    HeaderComponent,
    MyAutoFocusDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [LoginGuard, LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
