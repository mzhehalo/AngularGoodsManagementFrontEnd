import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.css']
})
export class ProfileMenuComponent implements OnInit {
  user: any = 'Michael';
  routerName: any = 'name';

  constructor() { }
  ngOnInit(): void {
  }

}
