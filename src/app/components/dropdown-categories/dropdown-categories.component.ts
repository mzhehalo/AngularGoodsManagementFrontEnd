import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DropdownCategoriesService} from './dropdown-categories.service';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MainCategoryModel} from '../../model/main-category-model';
import {EditCategoriesService} from '../edit-categories/edit-categories.service';
import {MessengerService} from '../../messengers/messenger.service';
import {Subscription} from 'rxjs';

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
export class DropdownCategoriesComponent implements OnInit, ControlValueAccessor, OnDestroy {
  private subscription: Subscription = new Subscription();
  data: MainCategoryModel[];
  @Input()
  componentName: string;
  mainCategory = '';
  touched = false;
  disabled = false;
  toggleCategory: string;
  @Input()
  isShowCategories = false;
  @Output() isShowCategoriesChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private dropDownMenuService: DropdownCategoriesService,
              private editCategoryService: EditCategoriesService,
              private messengerService: MessengerService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.messengerService.getMessageAddCategory().subscribe(data => {
      this.loadCategories();
    });
  }

  loadCategories(): void {
    this.subscription.add(
      this.editCategoryService.getCategories().subscribe(data => {
        this.data = data;
      })
    );
  }

  passCategory(mainCategory: string, subCategory: string): void {
    this.isShowCategoriesChange.emit(false);
    this.isShowCategories = false;
    this.toggleCategory = '';
    this.markAsTouched();
    this.writeValue(mainCategory);
    if (!this.disabled) {
      this.onChange(this.mainCategory);
    }
    this.dropDownMenuService.passCategory(mainCategory, subCategory, this.componentName);
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

  subDropDownToggle(toggleCategory: string): void {
    if (toggleCategory === this.toggleCategory) {
      this.isShowCategories = false;
      this.toggleCategory = '';
    } else {
      this.isShowCategories = false;
      this.toggleCategory = '';
      this.toggleCategory = toggleCategory;
      this.isShowCategories = !this.isShowCategories;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
