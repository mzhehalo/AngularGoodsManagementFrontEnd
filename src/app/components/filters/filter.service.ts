import {Injectable} from '@angular/core';
import {Constants} from '../../config/constants';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() {
  }

  setPriceMinPossible(value): void {
    sessionStorage.setItem(Constants.PRICE_MIN_POSSIBLE, value);
  }

  setPriceMaxPossible(value): void {
    sessionStorage.setItem(Constants.PRICE_MAX_POSSIBLE, value);
  }

  getPriceMinPossible(): number {
    return Number(sessionStorage.getItem(Constants.PRICE_MIN_POSSIBLE));
  }

  getPriceMaxPossible(): number {
    return Number(sessionStorage.getItem(Constants.PRICE_MAX_POSSIBLE));
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
