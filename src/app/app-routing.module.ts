import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {MainComponent} from './components/main/main.component';
import {LoginGuard} from './guards/login.guard';
import {ProfileMenuComponent} from './components/profile-menu/profile-menu.component';
import {EditUserComponent} from './components/edit-user/edit-user.component';
import {UserComponent} from './components/user/user.component';
import {User2Component} from './components/user2/user2.component';


const routes: Routes = [{path: ':name/main', component: MainComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileMenuComponent},
  {path: 'edit', component: EditUserComponent},
  {path: 'users', component: UserComponent},
  {path: 'users2', component: User2Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LoginGuard]
})
export class AppRoutingModule {
}
