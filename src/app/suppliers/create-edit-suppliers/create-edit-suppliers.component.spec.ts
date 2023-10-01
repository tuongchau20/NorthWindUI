import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditSuppliersComponent } from './create-edit-suppliers.component';

describe('CreateEditSuppliersComponent', () => {
  let component: CreateEditSuppliersComponent;
  let fixture: ComponentFixture<CreateEditSuppliersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditSuppliersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditSuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
