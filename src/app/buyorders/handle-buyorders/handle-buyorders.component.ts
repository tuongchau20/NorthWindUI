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
    this.editBuyOrderId = this.route.snapshot.paramMap.get('id');
    if(this.editBuyOrderId != null){
      this.service.getBuyOrderById(this.editBuyOrderId).subscribe(item=>{
        this.editData = item;
        if(this.editData.buyOrderDetails != null){
          for(let i = 0;i<this.editData.buyOrderDetails.length;i++){
            this.AddBuyOrderDetails();
          }
        }
        this.buyorderForm.setValue({
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

  buyorderForm = this.formBuilder.group({
    orderNo: this.formBuilder.control('', Validators.required),
    buyerName: this.formBuilder.control('', Validators.required),
    totalPrice: this.formBuilder.control('', Validators.required),
    buyOrderDetails: this.formBuilder.array([])
  })

  redirectToList(){
    this.router.navigate(['buyorders']);
  }
  AddBuyOrderDetails(){
    this.formBuyOrderDetails = this.buyorderForm.get('buyOrderDetails') as FormArray;
    this.formBuyOrderDetails.push(this.GenerateRow());
  }
  GenerateRow(){
    return this.formBuilder.group({
      id: this.formBuilder.control({value: 0, disabled: true}),
      productId: this.formBuilder.control(this.buyorderForm.value),
      amount: this.formBuilder.control(''),
      prices: this.formBuilder.control(''),
    })
  }
  get buyOrderDetails(){
    return this.buyorderForm.get('buyOrderDetails') as FormArray;
  }
  saveBuyOrder(){
    console.log(this.buyorderForm.value);
    if(this.buyorderForm.valid){
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
