import { Component, OnInit, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedService } from 'src/app/shared.service';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-create-edit-employees',
  templateUrl: './create-edit-employees.component.html',
  styleUrls: ['./create-edit-employees.component.css']
})
export class CreateEditEmployeesComponent implements OnInit {
  employeeForm: FormGroup;
  actionBtn: string = "Save";
  actionHeader: string = "Add Customer";

  constructor(
    private dialogRef: MatDialogRef<CreateEditEmployeesComponent>,
    private fb: FormBuilder,
    private service: SharedService,
    private notifyService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.employeeForm = this.fb.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.actionHeader = 'Edit Employee';
      this.actionBtn = 'Update';
      this.employeeForm.patchValue(this.data);
    } else {
      this.actionHeader = 'Add Employee';
      this.actionBtn = 'Save';
    }
  }

  actionEmployee() {
    if (this.employeeForm.valid) {
      if (this.data) {
        this.service.updateEmployee(this.employeeForm.value).subscribe((res) => {
          if (res.status == 200) {
            this.notifyService.showSuccess('Employee updated successfully!', 'Success');
            this.dialogRef.close('update');
          } else {
            this.notifyService.showError('Failed to update employee!', 'Error');
          }
        });
      } else {
        this.service.createEmployee(this.employeeForm.value).subscribe((res) => {
          if (res.status == 200) {
            this.notifyService.showSuccess('Employee created successfully!', 'Success');
            this.dialogRef.close('save');
          } else {
            this.notifyService.showError('Failed to create employee!', 'Error');
          }
        });
      }
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.employeeForm.controls;
  }
}
