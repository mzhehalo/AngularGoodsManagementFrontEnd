import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MessengerService} from '../../messengers/messenger.service';
import {FilterService} from './filter.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  filterGroup: any;
  priceMinPossible: number;
  priceMaxPossible: number;

  constructor(private formBuilder: FormBuilder,
              private messengerService: MessengerService,
              private filterService: FilterService
  ) {
    this.filterGroup = formBuilder.group({
      filterFrom: [this.filterService.getPriceMinPossible(), [Validators.required]],
      filterTo: [this.filterService.getPriceMaxPossible(), [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.priceMinPossible = this.filterService.getPriceMinPossible();
    this.priceMaxPossible = this.filterService.getPriceMaxPossible();
  }

  filterPrice(): void {
    this.filterService.setPriceMin(this.filterGroup.value.filterFrom);
    this.filterService.setPriceMax(this.filterGroup.value.filterTo);
    this.messengerService.sendMessageFilter();
  }
}
