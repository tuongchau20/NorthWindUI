import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBuyordersComponent } from './list-buyorders.component';

describe('ListBuyordersComponent', () => {
  let component: ListBuyordersComponent;
  let fixture: ComponentFixture<ListBuyordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBuyordersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBuyordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
