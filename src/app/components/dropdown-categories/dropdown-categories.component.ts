import {Component, Input, OnInit} from '@angular/core';
import {DropdownCategoriesService} from './dropdown-categories.service';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-categories.component.html',
  styleUrls: ['./dropdown-categories.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: DropdownCategoriesComponent
  }]
})
export class DropdownCategoriesComponent implements OnInit, ControlValueAccessor {

  constructor(private dropDownMenu: DropdownCategoriesService) {
  }

  @Input()
  componentName: string;
  mainCategory = '';

  touched = false;

  disabled = false;

  ngOnInit(): void {
  }

  passCategory(mainCategory: string, subCategory: string): void {
    this.markAsTouched();
    this.writeValue(mainCategory);
    if (!this.disabled) {
      this.onChange(this.mainCategory);
    }
    this.dropDownMenu.passCategory(mainCategory, subCategory, this.componentName);
  }

  onChange = (mainCategory) => {};

  onTouched = () => {};

  writeValue(mainCategory: string): void {
    this.mainCategory = mainCategory;
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  markAsTouched(): void {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }
}
