import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared.service';
import { MatDialogRef,MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-create-edit-customers',
  templateUrl: './create-edit-customers.component.html',
  styleUrls: ['./create-edit-customers.component.css']
})
export class CreateEditCustomersComponent implements OnInit {

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
        email: [this.editData.email, Validators.required],
        phone: [this.editData.phone, Validators.required],
        address: [this.editData.address, Validators.required],
      })
    }else{
      this.customerForm = this.formBuilder.group({
        customerName: ['', Validators.required],
        email: ['', Validators.required],
        phone: ['', Validators.required],
        address: ['', Validators.required],
      })
    }
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
        if(res == true){
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
        if(res == true){
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
