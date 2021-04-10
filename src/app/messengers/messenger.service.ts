import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {
  subject = new Subject();
  subjectFilter = new Subject();
  subjectCart = new Subject();
  subjectOrder = new Subject();
  subjectDeleteProduct = new Subject();

  constructor() {
  }

  sendMessageCart(): void {
    this.subjectCart.next();
  }

  getMessageCart(): Observable<{}> {
    return this.subjectCart.asObservable();
  }

  sendMessageOrder(): void {
    this.subjectOrder.next();
  }

  getMessageOrder(): Observable<{}> {
    return this.subjectOrder.asObservable();
  }

  sendMessageDeleteProduct(id: number): void {
    this.subjectDeleteProduct.next(id);
  }

  getMessageDeleteProduct(): Observable<{}> {
    return this.subjectDeleteProduct.asObservable();
  }

  sendMessageFilter(): void {
    this.subjectFilter.next();
  }

  getMessageFilter(): Observable<{}> {
    return this.subjectFilter.asObservable();
  }

}
