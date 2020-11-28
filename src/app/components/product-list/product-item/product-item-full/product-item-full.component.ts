import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from '../../../../model/ProductModel';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../login/auth.service';
import {ProductListComponent} from '../../product-list.component';
import {ProductService} from '../../product.service';
import {stringify} from '@angular/compiler/src/util';

@Component({
  selector: 'app-product-item-full',
  templateUrl: './product-item-full.component.html',
  styleUrls: ['./product-item-full.component.css']
})
export class ProductItemFullComponent implements OnInit {
  product: ProductModel;
  role: string;
  firstNameFromStorage: string;

  constructor(private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private productList: ProductListComponent,
              private productService: ProductService,
              private router: Router
  ) {
    this.product = this.activatedRoute.snapshot.data.Product;
  }

  ngOnInit(): void {
    this.authService.getUserDetails().subscribe(data => this.role = data.role);
  }

  deleteProduct(): void {
    this.firstNameFromStorage = sessionStorage.getItem('FirstName');
    this.productService.deleteProduct(this.product.id).subscribe(value => {
      this.router.navigateByUrl('/' + (this.firstNameFromStorage).toString());
      console.log(value);
      // this.ngOnInit();
    });
  }

}
