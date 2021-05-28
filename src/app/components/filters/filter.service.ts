import {EventEmitter, Injectable, Output} from '@angular/core';
import {Constants} from '../../config/constants';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  @Output()
  minPossible: EventEmitter<number> = new EventEmitter();
  @Output()
  maxPossible: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  setPriceMin(value): void {
    sessionStorage.setItem(Constants.PRICE_MIN, value);
  }

  setPriceMax(value): void {
    sessionStorage.setItem(Constants.PRICE_MAX, value);
  }

  getPriceMin(): number {
    return Number(sessionStorage.getItem(Constants.PRICE_MIN));
  }

  getPriceMax(): number {
    return Number(sessionStorage.getItem(Constants.PRICE_MAX));
  }

}
