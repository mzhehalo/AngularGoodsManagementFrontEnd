import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DropdownCategoriesService} from '../dropdown-categories/dropdown-categories.service';
import {UserService} from '../edit-user/user.service';
import {ProductService} from '../product-list/product.service';
import {AuthService} from '../login/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  isLoggedIn: boolean;
  addProductForm: FormGroup;
  mainCategory = 'main category';
  subCategory = 'no category';
  @Output()
  isAddedProduct: boolean;
  selectedFile: File = null;
  selectedFilesName = 'no name';

  constructor(private formBuilder: FormBuilder,
              private productService: ProductService,
              private dropDownMenuService: DropdownCategoriesService,
              private userService: UserService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.addProductForm = this.formBuilder.group({
      productName: ['', [Validators.required]],
      productDescription: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(100)]],
      productBrand: ['', [Validators.required, Validators.maxLength(100)]],
      productPrice: ['', [Validators.required, Validators.pattern('[1-9][0-9]*')]],
      productImg: [null, [Validators.required]],
      productCategory: ['', [Validators.required]]
    });

    this.isLoggedIn = this.authService.isUserLoggedIn();
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
    this.subscription.add(
      this.productService.addProduct(formData).subscribe(value => {
      }, error => {
        this.addProductForm.reset();
        this.subCategory = 'no category';
        this.selectedFilesName = 'no name';
      })
    );
  }

  onSelectFile(event): void {
    this.selectedFile = event.target.files[event.target.files.length - 1] as File;
    if (this.selectedFile) {
      this.selectedFilesName = this.selectedFile.name.slice(0, 30);
    }
  }

  onClickedOutsideAddProduct($event: Event): void {
    this.isAddedProduct = false;
  }

  toggleAddProduct(): void {
    this.isAddedProduct = !this.isAddedProduct;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
