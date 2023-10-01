import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditCategoriesComponent } from './create-edit-categories.component';

describe('CreateEditCategoriesComponent', () => {
  let component: CreateEditCategoriesComponent;
  let fixture: ComponentFixture<CreateEditCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
