import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../login/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductModel} from '../../model/ProductModel';
import {EditProductService} from './edit-product.service';
import {DropdownCategoriesService} from '../dropdown-categories/dropdown-categories.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  product: ProductModel;
  editProductForm: any;
  firstNameFromStorage: string;
  mainCategory: string;
  subCategory: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private editProductService: EditProductService,
              private router: Router,
              private dropDownMenuService: DropdownCategoriesService
  ) {
    this.product = activatedRoute.snapshot.data.Product;
    this.editProductForm = this.formBuilder.group({
      productName: [this.product.productName, [Validators.required]],
      productDescription: [this.product.productDescription, [Validators.required]],
      productBrand: [this.product.productBrand, [Validators.required]],
      productPrice: [this.product.productPrice, [Validators.required]],
      productImg: [this.product.productImg, [Validators.required]]
    });

    this.mainCategory = this.product.mainCategory;
    this.subCategory = this.product.subCategory;
  }

  ngOnInit(): void {
    this.dropDownMenuService.mainCategoryEmitter.subscribe(data => {
      this.mainCategory = data;
    });
    this.dropDownMenuService.subCategoryEmitter.subscribe(data => {
      this.subCategory = data;
    });
  }

  editProduct(): void {
    this.firstNameFromStorage = sessionStorage.getItem('FirstName');
    this.editProductService.editProduct({
      mainCategory: this.mainCategory,
      subCategory: this.subCategory,
      productName: this.editProductForm.value.productName,
      productDescription: this.editProductForm.value.productDescription,
      productBrand: this.editProductForm.value.productBrand,
      productPrice: this.editProductForm.value.productPrice,
      productImg: this.editProductForm.value.productImg
    }, this.product.id).subscribe(value => {
        this.router.navigateByUrl(this.firstNameFromStorage);
      });
  }

}
