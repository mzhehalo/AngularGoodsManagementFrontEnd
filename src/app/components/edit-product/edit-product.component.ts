import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../login/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductModel} from '../../model/ProductModel';
import {EditProductService} from './edit-product.service';
import {DropdownCategoriesService} from '../dropdown-categories/dropdown-categories.service';
import {UserService} from '../edit-user/user.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  product: ProductModel;
  editProductForm: any;
  firstNameFromStorage: string;
  mainCategory = 'main category';
  subCategory = 'sub category';

  selectedFile: File = null;
  selectedFilesName = 'no name';

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private editProductService: EditProductService,
              private router: Router,
              private dropDownMenuService: DropdownCategoriesService,
              private userService: UserService
  ) {
    this.product = activatedRoute.snapshot.data.Product;
    this.editProductForm = this.formBuilder.group({
      productName: [this.product.productName, [Validators.required]],
      productDescription: [this.product.productDescription, [Validators.required, Validators.minLength(12), Validators.maxLength(100)]],
      productBrand: [this.product.productBrand, [Validators.required, Validators.maxLength(100)]],
      productPrice: [this.product.productPrice, [Validators.required, Validators.pattern('[1-9][0-9]*|0')]],
      productImg: [null, [Validators.required]],
      productCategory: [this.product.mainCategory, [Validators.required]]
    });

    this.mainCategory = this.product.mainCategory;
    this.subCategory = this.product.subCategory;
  }

  ngOnInit(): void {
    this.firstNameFromStorage = this.userService.getFirstNameFromSessionStorage();
    this.dropDownMenuService.mainCategoryEmitter.subscribe(data => {
      this.mainCategory = data;
    });
    this.dropDownMenuService.subCategoryEmitter.subscribe(data => {
      this.subCategory = data;
    });
  }

  editProduct(): void {
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    formData.append('mainCategory', this.mainCategory);
    formData.append('subCategory', this.subCategory);
    formData.append('productName', this.editProductForm.value.productName);
    formData.append('productDescription', this.editProductForm.value.productDescription);
    formData.append('productBrand', this.editProductForm.value.productBrand);
    formData.append('productPrice', this.editProductForm.value.productPrice);
    formData.append('productId', this.product.id.toString());
    this.editProductService.editProduct(formData).subscribe(value => {
        this.router.navigateByUrl(this.firstNameFromStorage);
      });
  }

  onSelectFile(event): void {
    this.selectedFile = event.target.files[event.target.files.length - 1] as File;
    if (this.selectedFile) {
      this.selectedFilesName = this.selectedFile.name.slice(0, 30);
    }
  }

}
