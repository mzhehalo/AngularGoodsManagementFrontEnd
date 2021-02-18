import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AddProductService} from './add-product.service';
import {toNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';
import {DropdownCategoriesService} from '../dropdown-categories/dropdown-categories.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  addProductForm: FormGroup;
  private id: string;
  mainCategory = 'main none';
  subCategory = 'sub none';

  constructor(private formBuilder: FormBuilder,
              private addProductService: AddProductService,
              private dropDownMenuService: DropdownCategoriesService
  ) {
    this.addProductForm = formBuilder.group({
      productName: ['', [Validators.required]],
      productDescription: ['', [Validators.required]],
      productBrand: ['', [Validators.required]],
      productPrice: ['', [Validators.required]],
      productImg: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.dropDownMenuService.mainCategoryEmitter.subscribe(data => {
      this.mainCategory = data;
    });
    this.dropDownMenuService.subCategoryEmitter.subscribe(data => {
      this.subCategory = data;
    });
  }

  addProduct(): void {
    this.id = sessionStorage.getItem('ID');
    this.addProductService.addProduct({
      mainCategory: this.mainCategory,
      subCategory: this.subCategory,
      productName: this.addProductForm.value.productName,
      productDescription: this.addProductForm.value.productDescription,
      productBrand: this.addProductForm.value.productBrand,
      productPrice: this.addProductForm.value.productPrice,
      productImg: this.addProductForm.value.productImg
    }, Number(this.id)).subscribe(value => {
      console.log(value);
      console.log('product added');
    });
  }
}
