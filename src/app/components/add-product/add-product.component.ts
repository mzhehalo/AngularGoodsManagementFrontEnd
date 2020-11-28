import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AddProductService} from './add-product.service';
import {toNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  addProductForm: FormGroup;
  private id: string;

  constructor(private formBuilder: FormBuilder,
              private addProductService: AddProductService
  ) {
    this.addProductForm = formBuilder.group({
      productName: ['', [Validators.required]],
      productDescription: ['', [Validators.required]],
      productBrand: ['', [Validators.required]],
      productPrice: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    console.log('Add product on init');
  }

  addProduct(): void {
    this.id = sessionStorage.getItem('ID');
    this.addProductService.addProduct({
      productName: this.addProductForm.value.productName,
      productDescription: this.addProductForm.value.productDescription,
      productBrand: this.addProductForm.value.productBrand,
      productPrice: this.addProductForm.value.productPrice,
    }, Number(this.id)).subscribe(value => {
      console.log(value);
      console.log('product added');
    });
  }

  uploadImage(): void {

  }
}
