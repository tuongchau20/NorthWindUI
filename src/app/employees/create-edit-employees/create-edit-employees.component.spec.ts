import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditEmployeesComponent } from './create-edit-employees.component';

describe('CreateEditEmployeesComponent', () => {
  let component: CreateEditEmployeesComponent;
  let fixture: ComponentFixture<CreateEditEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditEmployeesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
