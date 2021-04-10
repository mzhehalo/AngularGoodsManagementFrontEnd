import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../login/auth.service';
import {UserModel} from '../../model/UserModel';
import {ActivatedRoute, Router} from '@angular/router';
import {EditUserService} from './edit-user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: UserModel;
  editUserForm: any;
  emailFromStorage: string;
  passwordMatch = false;
  isEmailExist: string;

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
      email: [this.user.email, [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, {validators: this.password.bind(this)});
  }

  password(formGroup: FormGroup): any {
    const {value: password} = formGroup.get('password');
    const {value: confirmPassword} = formGroup.get('confirmPassword');
    return password === confirmPassword ? this.passwordMatch = true : this.passwordMatch = false;
  }


  ngOnInit(): void {
  }

  editUser(): void {
    this.emailFromStorage = sessionStorage.getItem('Email');
    this.editService.editUser({
      firstName: this.editUserForm.value.firstName,
      lastName: this.editUserForm.value.lastName,
      email: this.editUserForm.value.email,
      password: this.editUserForm.value.password
    }, this.emailFromStorage).subscribe(value => {
      }, error => {
        this.authService.logout();
        this.router.navigateByUrl('');
        if (error.error === 'Email already exist') {
          this.isEmailExist = error.error;
        } else {
          this.isEmailExist = '';
        }
        console.log(error);
      }
    )
    ;
  }

}
