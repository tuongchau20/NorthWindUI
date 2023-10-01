import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/notification.service';
import { MyErrorStateMatcher } from 'src/app/products/create-edit-products/create-edit-products.component';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-create-edit-categories',
  templateUrl: './create-edit-categories.component.html',
  styleUrls: ['./create-edit-categories.component.css']
})
export class CreateEditCategoriesComponent implements OnInit { 
  matcher = new MyErrorStateMatcher();
  categoryForm!: FormGroup;

  actionBtn: string = "Save";
  actionHeader: string = "Add Category";

  constructor(
    private notifyService: NotificationService,
    private formBuilder: FormBuilder,
    private service: SharedService,
    private matDialogRef: MatDialogRef<CreateEditCategoriesComponent>, 
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  ngOnInit(): void {
    if (this.editData) {
      this.actionHeader = "Update Category";
      this.actionBtn = "Update";

      this.categoryForm = this.formBuilder.group({
        id: this.editData.id,
        categoryName: [this.editData.categoryName, Validators.required], 
        description: [this.editData.description, Validators.required], 
      });
    } else {
      this.categoryForm = this.formBuilder.group({
        categoryName: ['', Validators.required], 
        description: ['', Validators.required], 
      });
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.categoryForm.controls;
  }

  actionCategory() {
    if (!this.editData) {
      this.addCategory(); 
    } else {
      this.updateCategory(); 
    }
  }

  addCategory() { 
    if (this.categoryForm.valid) {
      this.service.createCategory(this.categoryForm.value).subscribe((res) => {
        if (res.status == 200) {
          this.notifyService.showSuccess("Create category successfully!!", "Success");
          this.categoryForm.reset();
          this.matDialogRef.close('save');
        } else {
          this.notifyService.showError("Create category failed!!", "Error");
        }
      });
    }
  }

  updateCategory() { 
    if (this.categoryForm.valid) {
      this.service.updateCategory(this.categoryForm.value).subscribe((res) => {
        if (res.status == 200) {
          this.notifyService.showSuccess("Update category successfully!!", "Success");
          this.categoryForm.reset();
          this.matDialogRef.close('update');
        } else {
          this.notifyService.showError("Update category failed!!", "Error");
        }
      });
    }
  }
}