import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared.service';
import { MatDialogRef,MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-create-edit-products',
  templateUrl: './create-edit-products.component.html',
  styleUrls: ['./create-edit-products.component.css']
})
export class CreateEditProductsComponent implements OnInit {

  productForm !: FormGroup;
  actionBtn: string = "Save";
  actionHeader: string = "Add Product";

  constructor(private notifyService: NotificationService,private formBuilder: FormBuilder, private service: SharedService, private matDialogRef: MatDialogRef<CreateEditProductsComponent>, @Inject(MAT_DIALOG_DATA) public editData: any) { 
    
  }

  ngOnInit(): void {
    // this.productForm = this.formBuilder.group({
    //   productCode: ['', Validators.required],
    //   productName: ['', Validators.required],
    //   amount: ['', Validators.required],
    //   productOwner: ['', Validators.required],
    // })
    if(this.editData){
      this.actionHeader = "Update Product";
      this.actionBtn = "Update";
      // this.productForm.controls['productCode'].setValue(this.editData.productCode);
      // this.productForm.controls['productName'].setValue(this.editData.productName);
      // this.productForm.controls['amount'].setValue(this.editData.amount);
      // this.productForm.controls['productOwner'].setValue(this.editData.productOwner);
      this.productForm = this.formBuilder.group({
        id: this.editData.id,
        productCode: [this.editData.productCode, Validators.required],
        productName: [this.editData.productName, Validators.required],
        amount: [this.editData.amount, Validators.required],
        productOwner: [this.editData.productOwner, Validators.required],
      })
    }else{
      this.productForm = this.formBuilder.group({
        productCode: ['', Validators.required],
        productName: ['', Validators.required],
        amount: ['', Validators.required],
        productOwner: ['', Validators.required],
      })
    }
    
    console.log(this.editData);
    
  }
  actionProduct(){
    if(!this.editData){
      this.addProduct();
    }else{
      this.updateProduct();
    }
  }

  addProduct(){
    if(this.productForm.valid){
      this.service.createProducts(this.productForm.value).subscribe(res => {
        if(res.status == 200){
          this.notifyService.showSuccess("Create product successfully!!", "Succcess");
          this.productForm.reset();
          this.matDialogRef.close('save');
        }else{
          this.notifyService.showError("Create product failed!!", "Error");
        }
      })
    }
  }
  updateProduct(){
    if(this.productForm.valid){
      this.service.updateProducts(this.productForm.value).subscribe(res => {
        if(res.status == 200){
          this.notifyService.showSuccess("Update product successfully!!", "Succcess");
          this.productForm.reset();
          this.matDialogRef.close('update');
        }else{
          this.notifyService.showError("Update product failed!!", "Error");
        }
      })
    }
    
  }
}
