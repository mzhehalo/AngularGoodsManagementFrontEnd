import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../order/order.service';
import {UserService} from '../edit-user/user.service';
import {ProductService} from '../product-list/product.service';
import {FilterService} from '../filters/filter.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  role: string;
  isCategory: boolean;
  ordersQuantity: number;

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private orderService: OrderService,
              private productService: ProductService,
              private filterService: FilterService
  ) {
  }

  ngOnInit(): void {
    this.isCategory = this.activatedRoute.snapshot.url[0] !== undefined;
    this.subscription.add(
      this.userService.getAuthUserDetails().subscribe(data => {
        this.role = data.role;
      })
    );

    this.subscription.add(
      this.productService.getProductMinMax(this.activatedRoute.snapshot.params.mainCategory,
        this.activatedRoute.snapshot.params.subCategory).subscribe(value => {
        this.filterService.minPossible.emit(value.priceMin);
        this.filterService.maxPossible.emit(value.priceMax);
      })
    );

    this.orderService.orderQuantityEmitter.subscribe(quantity => this.ordersQuantity = quantity);

    this.subscription.add(
      this.orderService.getOrdersQuantity().subscribe(quantity => {
        this.orderService.orderQuantityEmitter.emit(quantity);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
