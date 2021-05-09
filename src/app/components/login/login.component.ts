import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  authenticate(): void {
    this.authService.authenticate({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }).subscribe((authResponse) => {
      this.authService.registerSuccessfulLogin(this.loginForm.value.email, authResponse);
      this.authService.loggedInEmitter.emit(true);
      this.authService.setUserToSessionStorage();
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Login Successful';
    }, (error) => {
      console.log(error);
      this.errorMessage = error.error.message;
      this.invalidLogin = true;
      this.loginSuccess = false;
    });
  }
}
