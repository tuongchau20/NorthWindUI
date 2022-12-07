import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditCustomersComponent } from './create-edit-customers.component';

describe('CreateEditCustomersComponent', () => {
  let component: CreateEditCustomersComponent;
  let fixture: ComponentFixture<CreateEditCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditCustomersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
