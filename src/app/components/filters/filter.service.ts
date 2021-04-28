import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  PRICE_MIN_POSSIBLE = 'priceMinPossible';
  PRICE_MAX_POSSIBLE = 'priceMaxPossible';
  PRICE_MIN = 'priceMin';
  PRICE_MAX = 'priceMax';

  constructor() {
  }

  setPriceMinPossible(value): void {
    sessionStorage.setItem(this.PRICE_MIN_POSSIBLE, value);
  }

  setPriceMaxPossible(value): void {
    sessionStorage.setItem(this.PRICE_MAX_POSSIBLE, value);
  }

  getPriceMinPossible(): number {
    return Number(sessionStorage.getItem(this.PRICE_MIN_POSSIBLE));
  }

  getPriceMaxPossible(): number {
    return Number(sessionStorage.getItem(this.PRICE_MAX_POSSIBLE));
  }

  setPriceMin(value): void {
    sessionStorage.setItem(this.PRICE_MIN, value);
  }

  setPriceMax(value): void {
    sessionStorage.setItem(this.PRICE_MAX, value);
  }

  getPriceMin(): number {
    return Number(sessionStorage.getItem(this.PRICE_MIN));
  }

  getPriceMax(): number {
    return Number(sessionStorage.getItem(this.PRICE_MAX));
  }

}
