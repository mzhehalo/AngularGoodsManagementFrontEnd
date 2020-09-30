import {Component, Directive, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user/user.service';
import {ActivatedRoute} from '@angular/router';
import {LoginService} from './login.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login(): Observable<any> {
    return this.loginService.login({
      firstName: this.loginForm.value.firstName,
      password: this.loginForm.value.password
    });
    // this.activatedRoute.data.subscribe(value => console.log(value));
  }
}
