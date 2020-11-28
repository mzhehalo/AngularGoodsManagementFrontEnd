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
  private baseUrl = 'http://localhost:8100';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  authenticate(): void {
    return this.authService.authenticate({
      firstName: this.loginForm.value.firstName,
      password: this.loginForm.value.password
    }).subscribe((result) => {
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Login Successful.';
      this.router.navigate(['', this.loginForm.value.firstName]);
      console.log('success');
      console.log(result);
    }, (error) => {
        this.invalidLogin = true;
        this.loginSuccess = false;
        console.log('error');
        console.log(error);
    });
  }
}
