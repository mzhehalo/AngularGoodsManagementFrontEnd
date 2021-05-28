import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../login/auth.service';
import {UserModel} from '../../model/UserModel';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from './user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  user: UserModel;
  editUserForm: any;
  passwordMatch = false;
  isEmailExist: string;
  role: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private editService: UserService,
              private router: Router,
              private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.user = this.activatedRoute.snapshot.data.User;
    this.editUserForm = this.formBuilder.group({
      firstName: [this.user.firstName, [Validators.required]],
      lastName: [this.user.lastName, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, {validators: this.password.bind(this)});
    this.role = this.userService.getRoleFromSessionStorage();
  }

  password(formGroup: FormGroup): any {
    const {value: password} = formGroup.get('password');
    const {value: confirmPassword} = formGroup.get('confirmPassword');
    return password === confirmPassword ? this.passwordMatch = true : this.passwordMatch = false;
  }

  editUser(): void {
    this.subscription.add(
      this.editService.editUser({
        id: this.user.id,
        firstName: this.editUserForm.value.firstName,
        lastName: this.editUserForm.value.lastName,
        email: this.editUserForm.value.email,
        password: this.editUserForm.value.password
      }).subscribe(value => {
        }, error => {
          if (this.role !== 'ROLE_ADMIN' && error.status === 200) {
            this.authService.logout();
            this.router.navigateByUrl('login');
          } else {
            this.router.navigateByUrl(this.userService.getFirstNameFromSessionStorage() + '/edit/users');
          }
          if (error.error === 'User with this email already exist') {
            this.isEmailExist = error.error;
          } else {
            this.isEmailExist = '';
          }
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
