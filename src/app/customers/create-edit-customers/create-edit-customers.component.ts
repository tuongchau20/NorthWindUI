import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators,AbstractControl } from '@angular/forms';
import { SharedService } from 'src/app/shared.service';
import { MatDialogRef,MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/notification.service';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-create-edit-customers',
  templateUrl: './create-edit-customers.component.html',
  styleUrls: ['./create-edit-customers.component.css']
})
export class CreateEditCustomersComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  customerForm !: FormGroup;
  actionBtn: string = "Save";
  actionHeader: string = "Add Customer";
  constructor(private notifyService: NotificationService,private formBuilder: FormBuilder, private service: SharedService, private matDialogRef: MatDialogRef<CreateEditCustomersComponent>, @Inject(MAT_DIALOG_DATA) public editData: any) { }

  ngOnInit(): void {
    if(this.editData){
      this.actionHeader = "Update Customer";
      this.actionBtn = "Update";
      this.customerForm = this.formBuilder.group({
        id: this.editData.id,
        customerName: [this.editData.customerName, Validators.required],
        contactName: [this.editData.contactName, Validators.required],
        address: [this.editData.address, Validators.required],
        city: [this.editData.city, Validators.required],
        postalCode: [this.editData.postalCode, Validators.required],
        country: [this.editData.country, Validators.required],
      })
    }else{
      this.customerForm = this.formBuilder.group({
        customerName: ['', Validators.required],
        contactName: ['', Validators.required],
        address: ['', Validators.required],
        city: ['', Validators.required],
        postalCode: ['', Validators.required],
        country: ['', Validators.required],
      })
    }
  }
  get f(): { [key: string]: AbstractControl } {
    return this.customerForm.controls;
  }
  actionCustomer(){
    if(!this.editData){
      this.addCustomer();
    }else{
      this.updateCustomer();
    }
  }
  addCustomer(){
    if(this.customerForm.valid){
      this.service.createCustomers(this.customerForm.value).subscribe(res => {
        if(res.status == 200){
          this.notifyService.showSuccess("Create customer successfully!!", "Succcess");
          this.customerForm.reset();
          this.matDialogRef.close('save');
        }else{
          this.notifyService.showError("Create customer failed!!", "Error");
        }
      })
    }
  }
  updateCustomer(){
    if(this.customerForm.valid){
      this.service.updateCustomers(this.customerForm.value).subscribe(res => {
        if(res.status == 200){
          this.notifyService.showSuccess("Update customer successfully!!", "Succcess");
          this.customerForm.reset();
          this.matDialogRef.close('update');
        }else{
          this.notifyService.showError("Update customer failed!!", "Error");
        }
      })
    }
  }

}
