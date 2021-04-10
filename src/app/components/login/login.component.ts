import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage = 'Invalid Credentials';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.authService.loggedInEmitterUserFirstName.subscribe(firstName => {
      this.router.navigate(['', firstName]);

    });
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  authenticate(): void {
    return this.authService.authenticate({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }).subscribe((result) => {
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Login Successful';
    }, (error) => {
      this.invalidLogin = true;
      this.loginSuccess = false;
    });
  }
}
