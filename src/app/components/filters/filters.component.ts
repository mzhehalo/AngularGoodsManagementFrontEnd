import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MessengerService} from '../../messengers/messenger.service';

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
              private messengerService: MessengerService
  ) {
    this.filterGroup = formBuilder.group({
      filterFrom: [Number(sessionStorage.getItem('priceMinPossible')), [Validators.required]],
      filterTo: [Number(sessionStorage.getItem('priceMaxPossible')), [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.priceMinPossible = Number(sessionStorage.getItem('priceMinPossible'));
    this.priceMaxPossible = Number(sessionStorage.getItem('priceMaxPossible'));
  }

  filterPrice(): void {
    sessionStorage.setItem('priceMin', this.filterGroup.value.filterFrom);
    sessionStorage.setItem('priceMax', this.filterGroup.value.filterTo);
    this.messengerService.sendMessageFilter();
  }
}
