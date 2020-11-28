import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../login/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductModel} from '../../model/ProductModel';
import {EditProductService} from './edit-product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  product: ProductModel;
  editProductForm: any;
  productId: number;
  firstNameFromStorage: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private editProductService: EditProductService,
              private router: Router
  ) {
    // activatedRoute.params.subscribe()
    this.product = activatedRoute.snapshot.data.Product;
    this.editProductForm = this.formBuilder.group({
      productName: [this.product.productName, [Validators.required]],
      productDescription: [this.product.productDescription, [Validators.required]],
      productBrand: [this.product.productBrand, [Validators.required]],
      productPrice: [this.product.productPrice, [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  editProduct(): void {
    this.firstNameFromStorage = sessionStorage.getItem('FirstName');
    // console.log(this.firstNameFromStorage);
    this.editProductService.editProduct({
      productName: this.editProductForm.value.productName,
      productDescription: this.editProductForm.value.productDescription,
      productBrand: this.editProductForm.value.productBrand,
      productPrice: this.editProductForm.value.productPrice
    }, this.product.id).subscribe(value => {
        console.log(value);
        this.router.navigateByUrl(this.firstNameFromStorage);
      });
  }

}
