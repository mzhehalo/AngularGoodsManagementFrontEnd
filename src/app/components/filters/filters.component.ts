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
  priceMinPossible = 0;
  priceMaxPossible = 0;

  constructor(private formBuilder: FormBuilder,
              private messengerService: MessengerService,
              private filterService: FilterService
  ) {
  }

  ngOnInit(): void {
    this.filterService.minPossible.subscribe(value => {
      this.priceMinPossible = value;
      this.filterGroup.controls.filterFrom.setValue(value);
    });

    this.filterService.maxPossible.subscribe(value => {
      this.priceMaxPossible = value;
      this.filterGroup.controls.filterTo.setValue(value);
    });
    this.filterGroup = this.formBuilder.group({
      filterFrom: [this.priceMinPossible, [Validators.required]],
      filterTo: [this.priceMaxPossible, [Validators.required]]
    });

  }

  filterPrice(): void {
    this.filterService.setPriceMin(this.filterGroup.value.filterFrom);
    this.filterService.setPriceMax(this.filterGroup.value.filterTo);
    this.messengerService.sendMessageFilter();
    this.messengerService.sendMessageFilterCategory();
  }

  resetPrice(): void {
    this.filterService.setPriceMin(this.priceMinPossible);
    this.filterService.setPriceMax(this.priceMaxPossible);
    this.messengerService.sendMessageFilter();
    this.messengerService.sendMessageFilterCategory();
    this.ngOnInit();
  }
}
