import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailBuyordersComponent } from './view-detail-buyorders.component';

describe('ViewDetailBuyordersComponent', () => {
  let component: ViewDetailBuyordersComponent;
  let fixture: ComponentFixture<ViewDetailBuyordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDetailBuyordersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDetailBuyordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
