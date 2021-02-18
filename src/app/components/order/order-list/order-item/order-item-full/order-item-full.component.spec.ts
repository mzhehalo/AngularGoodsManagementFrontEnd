import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemFullComponent } from './order-item-full.component';

describe('OrderItemFullComponent', () => {
  let component: OrderItemFullComponent;
  let fixture: ComponentFixture<OrderItemFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderItemFullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderItemFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
