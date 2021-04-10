import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegisterService} from './register.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  passwordMatch = false;
  isEmailExist: string;

  constructor(private formBuilder: FormBuilder,
              private registerService: RegisterService,
              private router: Router
  ) {
    this.registerForm = formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', [Validators.required]]
    }, {validators: this.password.bind(this)});
  }

  password(formGroup: FormGroup): any {
    const {value: password} = formGroup.get('password');
    const {value: confirmPassword} = formGroup.get('confirmPassword');
    return password === confirmPassword ? this.passwordMatch = true : this.passwordMatch = false;
  }

  ngOnInit(): void {
  }

  registerUser(): void {
    this.registerService.registerUser({
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
    });
  }
}
