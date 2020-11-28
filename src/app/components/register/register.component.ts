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

  constructor(private formBuilder: FormBuilder,
              private registerService: RegisterService,
              private router: Router
  ) {
    this.registerForm = formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password1: ['', [Validators.required]],
      password2: ['', [Validators.required]],
      role: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  registerUser(): void {
    this.registerService.registerUser({
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password1,
      role: this.registerForm.value.role
    }).subscribe(value => {
      console.log(value);
      this.router.navigateByUrl('login');
    });
  }
}
