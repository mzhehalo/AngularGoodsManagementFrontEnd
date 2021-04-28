import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AddProductService} from './add-product.service';
import {DropdownCategoriesService} from '../dropdown-categories/dropdown-categories.service';
import {UserService} from '../edit-user/user.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  addProductForm: FormGroup;
  id: number;
  mainCategory = 'main category';
  subCategory = 'sub category';

  selectedFile: File = null;
  selectedFilesName = 'no name';

  constructor(private formBuilder: FormBuilder,
              private addProductService: AddProductService,
              private dropDownMenuService: DropdownCategoriesService,
              private userService: UserService
  ) {
    this.addProductForm = formBuilder.group({
      productName: ['', [Validators.required]],
      productDescription: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(100)]],
      productBrand: ['', [Validators.required, Validators.maxLength(100)]],
      productPrice: ['', [Validators.required, Validators.pattern('[1-9][0-9]*')]],
      productImg: [null, [Validators.required]],
      productCategory: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.id = this.userService.getUserIdFromSessionStorage();
    this.dropDownMenuService.mainCategoryEmitter.subscribe(data => {
      this.mainCategory = data;
    });
    this.dropDownMenuService.subCategoryEmitter.subscribe(data => {
      this.subCategory = data;
    });
  }

  addProduct(): void {
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    formData.append('mainCategory', this.mainCategory);
    formData.append('subCategory', this.subCategory);
    formData.append('productName', this.addProductForm.value.productName);
    formData.append('productDescription', this.addProductForm.value.productDescription);
    formData.append('productBrand', this.addProductForm.value.productBrand);
    formData.append('productPrice', this.addProductForm.value.productPrice);
    formData.append('sellerId', this.id.toString());
    this.addProductService.addProduct(formData).subscribe(value => {
    });
  }

  onSelectFile(event): void {
    this.selectedFile = event.target.files[event.target.files.length - 1] as File;
    if (this.selectedFile) {
      this.selectedFilesName = this.selectedFile.name.slice(0, 30);
    }
  }
}
