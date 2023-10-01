import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators, AbstractControl } from '@angular/forms';
import { SharedService } from 'src/app/shared.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/notification.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-create-edit-shippers',
  templateUrl: './create-edit-shippers.component.html',
  styleUrls: ['./create-edit-shippers.component.css']
})
export class CreateEditShippersComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  shipperForm!: FormGroup;
  actionBtn: string = "Save";
  actionHeader: string = "Add Shipper";

  constructor(
    private notifyService: NotificationService,
    private formBuilder: FormBuilder,
    private service: SharedService,
    private matDialogRef: MatDialogRef<CreateEditShippersComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  ngOnInit(): void {
    if (this.editData) {
      this.actionHeader = "Update Shipper";
      this.actionBtn = "Update";

      this.shipperForm = this.formBuilder.group({
        id: this.editData.id,
        shipperName: [this.editData.shipperName, Validators.required],
        phone: [this.editData.phone, Validators.required],
      });
    } else {
      this.shipperForm = this.formBuilder.group({
        shipperName: ['', Validators.required],
        phone: ['', Validators.required],
      });
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.shipperForm.controls;
  }

  actionShipper() {
    if (!this.editData) {
      this.addShipper();
    } else {
      this.updateShipper();
    }
  }

  addShipper() {
    if (this.shipperForm.valid) {
      this.service.createShipper(this.shipperForm.value).subscribe((res) => {
        if (res.status == 200) {
          this.notifyService.showSuccess("Create shipper successfully!!", "Success");
          this.shipperForm.reset();
          this.matDialogRef.close('save');
        } else {
          this.notifyService.showError("Create shipper failed!!", "Error");
        }
      });
    }
  }

  updateShipper() {
    if (this.shipperForm.valid) {
      this.service.updateShipper(this.shipperForm.value).subscribe((res) => {
        if (res.status == 200) {
          this.notifyService.showSuccess("Update shipper successfully!!", "Success");
          this.shipperForm.reset();
          this.matDialogRef.close('update');
        } else {
          this.notifyService.showError("Update shipper failed!!", "Error");
        }
      });
    }
  }
}
