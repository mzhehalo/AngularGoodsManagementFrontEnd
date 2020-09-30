import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: any = 'value';
  editUserForm: any;

  constructor(private formBuilder: FormBuilder) {
    this.editUserForm = formBuilder.group({
      login: [this.user, [Validators.required]],
      name: [this.user, [Validators.required]],
      lastName: [this.user, [Validators.required]],
      email: [this.user, [Validators.required]],
      password1: ['', [Validators.required]],
      password2: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  editUser(): void {
  }
}
