import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyordersComponent } from './buyorders.component';

describe('BuyordersComponent', () => {
  let component: BuyordersComponent;
  let fixture: ComponentFixture<BuyordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyordersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
