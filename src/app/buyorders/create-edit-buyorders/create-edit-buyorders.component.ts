import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validator, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared.service';
import { MatDialogRef,MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-create-edit-buyorders',
  templateUrl: './create-edit-buyorders.component.html',
  styleUrls: ['./create-edit-buyorders.component.css']
})
export class CreateEditBuyordersComponent implements OnInit {

  buyorderForm !: FormGroup;
  actionBtn: string = "Save";
  actionHeader: string = "Add BuyOrder";
  listProducts: any = [];

  constructor(private notifyService: NotificationService,private formBuilder: FormBuilder, private service: SharedService, private matDialogRef: MatDialogRef<CreateEditBuyordersComponent>, @Inject(MAT_DIALOG_DATA) public editData: any) { 
    this.buyorderForm = this.formBuilder.group({
      orderNo: ['', Validators.required],
      buyerName: ['', Validators.required],
      totalPrice: ['', Validators.required],
      buyOrderDetails: this.formBuilder.array([]),
    })
  }

  ngOnInit(): void {
    this.getAllProduct();
    if(this.editData){
      this.actionHeader = "Update BuyOrder";
      this.actionBtn = "Update";
      if(this.editData.buyOrderDetails != null){
        for(let i = 0;i<this.editData.buyOrderDetails.length;i++){
          this.addBuyOrderDetails();
        }
      }
      this.buyorderForm = this.formBuilder.group({
        orderNo: [this.editData.orderNo, Validators.required],
        buyerName: [this.editData.buyerName, Validators.required],
        totalPrice: [this.editData.totalPrice, Validators.required],
        buyOrderDetails: this.editData.buyOrderDetails,
      })
    }
    console.log(this.editData);
    
  }
  
  buyOrderDetails() : FormArray {
    return this.buyorderForm.get("buyOrderDetails") as FormArray
  }

  newBuyOrderDetails(): FormGroup {
    return this.formBuilder.group({
      productId: [this.buyorderForm.value.productId, Validators.required],
      amount: [this.buyorderForm.value.amount, Validators.required],
      prices: [this.buyorderForm.value.prices, Validators.required],
    })
  }
  addBuyOrderDetails() {
    this.buyOrderDetails().push(this.newBuyOrderDetails());
  }
  removeBuyOrderDetails(i:number) {
    this.buyOrderDetails().removeAt(i);
  }

  actionBuyOrder(){
    if(!this.editData){
      this.addBuyOrder();
    }else{
      this.updateBuyOrder();
    }
  }

  getAllProduct(){
    this.service.getAllProducts().subscribe({
      next: (data) => {
        this.listProducts = data;
      },
      error: (err) => {
        alert("Error");
      }
    })
  }

  addBuyOrder(){
    // console.log(this.buyorderForm.value);
    if(this.buyorderForm.valid){
      this.service.createBuyOrders(this.buyorderForm.value).subscribe(res => {
        if(res == true){
          this.notifyService.showSuccess("Create buyorder successfully!!", "Succcess");
          this.buyorderForm.reset();
          this.matDialogRef.close('save');
        }else{
          this.notifyService.showError("Create buyorder failed!!", "Error");
        }
      })
    }
  }
  updateBuyOrder(){
    
  }

}
