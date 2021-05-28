import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../edit-user/user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  registerForm: FormGroup;
  passwordMatch = false;
  isEmailExist: string;

  constructor(private formBuilder: FormBuilder,
              private editUserService: UserService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', [Validators.required]]
    }, {validators: this.password.bind(this)});
  }

  password(formGroup: FormGroup): boolean {
    const {value: password} = formGroup.get('password');
    const {value: confirmPassword} = formGroup.get('confirmPassword');
    return password === confirmPassword ? this.passwordMatch = true : this.passwordMatch = false;
  }

  registerUser(): void {
    this.subscription.add(
      this.editUserService.registerUser({
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        role: this.registerForm.value.role
      }).subscribe(value => {
        this.router.navigateByUrl('login');
      }, error => {
        if (error.error === 'Email already exist') {
          this.isEmailExist = error.error;
        } else {
          this.isEmailExist = '';
        }
        console.log(error);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
