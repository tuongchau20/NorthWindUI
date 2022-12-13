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
  onChange(index:number){
    // const subTotal = this.formBuyOrderDetails.at(index).get('amount')?.value * this.formBuyOrderDetails.at(index).get('prices')?.value;
    
    const total = this.buyOrderDetails.value.reduce((acc: any,curr: any)=>{
        acc += (curr.amount || 0) * (curr.prices || 0);
        return acc;
    }, 0);
    this.buyorderForm.get('totalPrice')?.setValue(total);
  }
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
    // console.log(this.buyorderForm.value);
  }
  RemoveBuyOrderDetails(index: any){
    if (confirm('Do you want to remove this BuyOrder Detail?')) {
      if(!this.editData){
        this.formBuyOrderDetails = this.buyorderForm.get("buyOrderDetails") as FormArray;
        this.formBuyOrderDetails.removeAt(index);
        this.onChange(index);
      }else{
        this.formBuyOrderDetails = this.buyorderForm.get("buyOrderDetails") as FormArray;
        this.formBuyOrderDetails.removeAt(index);
        this.onChange(index);
        if(this.editData.buyOrderDetails[index]){
          this.service.deleteBuyOrderById(this.editData.buyOrderDetails[index].id).subscribe(res =>{
            if(res == true){
              this.notifyService.showSuccess("Delete buyorder detail successfully!!", "Succcess");
            }else{
              this.notifyService.showError("Delete buyorder detail failed!!", "Error");
            }
          })
        }
      }
    }
  }
  getAllProduct(){
    this.service.getAllProducts().subscribe({
      next: (data) => {
        if(data.status == 200){
          this.listProducts = data.data;
        }
      },
      error: (err) => {
        alert("Error");
      }
    })
  }
}
