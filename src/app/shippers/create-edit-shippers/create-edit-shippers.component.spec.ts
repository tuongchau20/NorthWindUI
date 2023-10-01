import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditShippersComponent } from './create-edit-shippers.component';

describe('CreateEditShippersComponent', () => {
  let component: CreateEditShippersComponent;
  let fixture: ComponentFixture<CreateEditShippersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditShippersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditShippersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
