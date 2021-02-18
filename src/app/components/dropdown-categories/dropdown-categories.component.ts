import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DropdownCategoriesService} from './dropdown-categories.service';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-categories.component.html',
  styleUrls: ['./dropdown-categories.component.css']
})
export class DropdownCategoriesComponent implements OnInit {
  @Input()
  componentName: string;
  constructor(private dropDownMenu: DropdownCategoriesService) { }

  ngOnInit(): void {
  }

  passCategory(mainCategory: string, subCategory: string): void {
    this.dropDownMenu.passCategory(mainCategory, subCategory, this.componentName);
  }
}
