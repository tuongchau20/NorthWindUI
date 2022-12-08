import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditBuyordersComponent } from './create-edit-buyorders.component';

describe('CreateEditBuyordersComponent', () => {
  let component: CreateEditBuyordersComponent;
  let fixture: ComponentFixture<CreateEditBuyordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditBuyordersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditBuyordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
