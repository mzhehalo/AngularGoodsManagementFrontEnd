import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user/user.service';
import {UserModel} from '../../model/UserModel';
import {UserLoginModel} from '../../model/UserLoginModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userPresent: UserModel;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.loginForm = formBuilder.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    console.log(this.loginForm);
  }

  ngOnInit(): void {
  }

  validateUser(): void {
    this.userService.validateUser({
      name: this.loginForm.value.name,
      password: this.loginForm.value.password
    }).subscribe(value => this.userPresent = value);
  }
}
