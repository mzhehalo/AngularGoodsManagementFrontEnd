import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ProductModel} from '../../model/ProductModel';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {
  subject = new Subject();

  constructor() {
  }

  sendMessageCart(): void {
    this.subject.next();
  }

  getMessageCart(): Observable<{}> {
    return this.subject.asObservable();
  }

  sendMessageOrder(): void {
    this.subject.next();
  }

  getMessageOrder(): Observable<{}> {
    return this.subject.asObservable();
  }

}
