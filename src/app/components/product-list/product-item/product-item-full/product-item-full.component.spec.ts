import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductItemFullComponent } from './product-item-full.component';

describe('ProductItemFullComponent', () => {
  let component: ProductItemFullComponent;
  let fixture: ComponentFixture<ProductItemFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductItemFullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductItemFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
