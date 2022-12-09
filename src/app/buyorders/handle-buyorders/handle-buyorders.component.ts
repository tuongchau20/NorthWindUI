import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validator, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared.service';
import { MatDialogRef,MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/notification.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-handle-buyorders',
  templateUrl: './handle-buyorders.component.html',
  styleUrls: ['./handle-buyorders.component.css']
})
export class HandleBuyordersComponent implements OnInit {


  constructor(private route: ActivatedRoute,private notifyService: NotificationService,private formBuilder: FormBuilder, private service: SharedService, private router: Router) { }

  ngOnInit(): void {
    this.getAllProduct();
    this.editBuyOrderId = this.route.snapshot.params['id'];
    if(this.editBuyOrderId != null){
      this.actionHeader = "BuyOrder Update Form";
      this.actionBtn = "Update";
      this.service.getBuyOrderById(this.editBuyOrderId).subscribe(item=>{
        this.editData = item;
        
        if(this.editData.buyOrderDetails != null){
          for(let item of this.editData.buyOrderDetails){
            this.EditBuyOrderDetails(item);
          }
        }
        this.buyorderForm.setValue({
          id: this.editData.id,
          orderNo: this.editData.orderNo,
          buyerName: this.editData.buyerName, 
          totalPrice: this.editData.totalPrice,
          buyOrderDetails: this.editData.buyOrderDetails
        })
      })
    }
    
  }
  formBuyOrderDetails !: FormArray<any>;
  listProducts: any;
  saveResponse: any;
  editData: any;
  editBuyOrderId: any;
  actionBtn: string = "Save";
  actionHeader: string = "BuyOrder Create Form";

  buyorderForm = this.formBuilder.group({
    id: 0,
    orderNo: this.formBuilder.control('', Validators.required),
    buyerName: this.formBuilder.control('', Validators.required),
    totalPrice: this.formBuilder.control('', Validators.required),
    buyOrderDetails: this.formBuilder.array([])
  })

  redirectToList(){
    this.router.navigate(['buyorders']);
  }
  EditBuyOrderDetails(item : any){
    this.formBuyOrderDetails = this.buyorderForm.get("buyOrderDetails") as FormArray;
    this.formBuyOrderDetails.push(this.GenerateEditRow(item));
  }
  GenerateEditRow(item: any){
    return this.formBuilder.group({
      id: this.formBuilder.control(item.id),
      buyOrderId: this.formBuilder.control(item.buyOrderId),
      productId: this.formBuilder.control(item.productId, Validators.required),
      amount: this.formBuilder.control(item.amount, Validators.required),
      prices: this.formBuilder.control(item.prices, Validators.required),
      createdDate: this.formBuilder.control(item.createdDate),
      createdBy: this.formBuilder.control(item.createdBy),
      modifiedDate: this.formBuilder.control(item.modifiedDate),
      modifiedBy: this.formBuilder.control(item.modifiedBy),
    })
  }
  AddBuyOrderDetails(){
    this.formBuyOrderDetails = this.buyorderForm.get("buyOrderDetails") as FormArray;
    this.formBuyOrderDetails.push(this.GenerateRow());
  }
  GenerateRow(){
    return this.formBuilder.group({
      id: this.formBuilder.control({value: 0, disabled: true}),
      productId: this.formBuilder.control('',Validators.required),
      amount: this.formBuilder.control('',Validators.required),
      prices: this.formBuilder.control('',Validators.required),
    })
  }
  get buyOrderDetails(){
    return this.buyorderForm.get('buyOrderDetails') as FormArray;
  }
  saveBuyOrder(){
    if(this.buyorderForm.valid){
      if(!this.editData){
        this.CreateBuyOrder();
      }else{
        this.UpdateBuyOrder();
      }
    }else{
      this.notifyService.showWarning("Please complete all information!", "Warning");
    }
  }
  CreateBuyOrder(){
    this.service.createBuyOrders(this.buyorderForm.value).subscribe(res => {
      if(res == true){
        this.notifyService.showSuccess("Create buyorder successfully!!", "Succcess");
        this.buyorderForm.reset();
        this.redirectToList();
      }else{
        this.notifyService.showError("Create buyorder failed!!", "Error");
      }
    })
  }
  UpdateBuyOrder(){
    this.service.updateBuyOrders(this.buyorderForm.value).subscribe(res => {
      if(res == true){
        this.notifyService.showSuccess("Update buyorder successfully!!", "Succcess");
        this.buyorderForm.reset();
        this.redirectToList();
      }else{
        this.notifyService.showError("Update buyorder failed!!", "Error");
      }
    })
  }
  RemoveBuyOrderDetails(index: any){
    if (confirm('Do you want to remove this BuyOrder Detail?')) {
      this.formBuyOrderDetails = this.buyorderForm.get("buyOrderDetails") as FormArray;
      this.formBuyOrderDetails.removeAt(index)
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
}
