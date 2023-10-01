import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandleBuyordersComponent } from './handle-buyorders.component';

describe('HandleBuyordersComponent', () => {
  let component: HandleBuyordersComponent;
  let fixture: ComponentFixture<HandleBuyordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HandleBuyordersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HandleBuyordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
