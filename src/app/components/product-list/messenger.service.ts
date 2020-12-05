import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ProductModel} from '../../model/ProductModel';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {
  subject = new Subject();

  constructor() { }

  sendMessage(): void {
    console.log();
    this.subject.next();
  }

  getMessage(): Observable<{}>{
    return this.subject.asObservable();
  }
}
