import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../login/auth.service';
import {UserModel} from '../../model/UserModel';
import {ActivatedRoute, Router} from '@angular/router';
import {RegisterService} from '../register/register.service';
import {EditUserService} from './edit-user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: UserModel;
  editUserForm: any;
  firstNameFromStorage: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private editService: EditUserService,
              private router: Router
  ) {
    this.user = activatedRoute.snapshot.data.User;
    this.editUserForm = this.formBuilder.group({
      firstName: [this.user.firstName, [Validators.required]],
      lastName: [this.user.lastName, [Validators.required]],
      email: [this.user.email, [Validators.required]],
      password1: ['', [Validators.required]],
      password2: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  editUser(): void {
    this.firstNameFromStorage = sessionStorage.getItem('FirstName');
    console.log(this.firstNameFromStorage);
    this.editService.editUser({
      firstName: this.editUserForm.value.firstName,
      lastName: this.editUserForm.value.lastName,
      email: this.editUserForm.value.email,
      password: this.editUserForm.value.password1
    }, this.firstNameFromStorage).subscribe(value => {
        console.log(value);
        this.authService.logout();
        this.router.navigateByUrl('');
      }
    )
    ;
  }

}
