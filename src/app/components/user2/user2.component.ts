import {Component, OnInit} from '@angular/core';
import {User2Service} from './user2.service';

@Component({
  selector: 'app-user2',
  templateUrl: './user2.component.html',
  styleUrls: ['./user2.component.css']
})
export class User2Component implements OnInit {
  UserFromDataBase: any;

  constructor(private userService: User2Service) {
  }

  ngOnInit(): void {
  }

  showUsers(): void {
    this.userService.getUsers().subscribe(value => this.UserFromDataBase = value);
  }
}
