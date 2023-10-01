import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/notification.service';
import { MyErrorStateMatcher } from 'src/app/products/create-edit-products/create-edit-products.component';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-create-edit-suppliers',
  templateUrl: './create-edit-suppliers.component.html',
  styleUrls: ['./create-edit-suppliers.component.css']
})
export class CreateEditSuppliersComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  supplierForm!: FormGroup;
  actionBtn: string = "Save";
  actionHeader: string = "Add Supplier";

  constructor(
    private notifyService: NotificationService,
    private formBuilder: FormBuilder,
    private service: SharedService,
    private matDialogRef: MatDialogRef<CreateEditSuppliersComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  ngOnInit(): void {
    if (this.editData) {
      this.actionHeader = "Update Supplier";
      this.actionBtn = "Update";

      this.supplierForm = this.formBuilder.group({
        id: this.editData.id,
        supplierName: [this.editData.supplierName, Validators.required],
        contactName: [this.editData.contactName, Validators.required],
        address: [this.editData.address, Validators.required],
        city: [this.editData.city, Validators.required],
        postalCode: [this.editData.postalCode, Validators.required],
        country: [this.editData.country, Validators.required],
        phone: [this.editData.phone, Validators.required],
      });
    } else {
      this.supplierForm = this.formBuilder.group({
        supplierName: ['', Validators.required],
        contactName: ['', Validators.required],
        address: ['', Validators.required],
        city: ['', Validators.required],
        postalCode: ['', Validators.required],
        country: ['', Validators.required],
        phone: ['', Validators.required],
      });
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.supplierForm.controls;
  }

  actionSupplier() {
    if (!this.editData) {
      this.addSupplier();
    } else {
      this.updateSupplier();
    }
  }

  addSupplier() {
    if (this.supplierForm.valid) {
      this.service.createSupplier(this.supplierForm.value).subscribe((res) => {
        if (res.status == 200) {
          this.notifyService.showSuccess("Create supplier successfully!!", "Success");
          this.supplierForm.reset();
          this.matDialogRef.close('save');
        } else {
          this.notifyService.showError("Create supplier failed!!", "Error");
        }
      });
    }
  }

  updateSupplier() {
    if (this.supplierForm.valid) {
      this.service.updateSupplier(this.supplierForm.value).subscribe((res) => {
        if (res.status == 200) {
          this.notifyService.showSuccess("Update supplier successfully!!", "Success");
          this.supplierForm.reset();
          this.matDialogRef.close('update');
        } else {
          this.notifyService.showError("Update supplier failed!!", "Error");
        }
      });
    }
  }
}
