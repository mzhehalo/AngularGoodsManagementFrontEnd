import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: any = true;
  routerName: any = 'name';

  change(): any {
    this.isLoggedIn = !this.isLoggedIn;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
