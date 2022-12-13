import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validator, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared.service';
import { MatDialogRef,MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/notification.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-handle-orders',
  templateUrl: './handle-orders.component.html',
  styleUrls: ['./handle-orders.component.css']
})
export class HandleOrdersComponent implements OnInit {

  constructor(private route: ActivatedRoute,private notifyService: NotificationService,private formBuilder: FormBuilder, private service: SharedService, private router: Router) { }

  ngOnInit(): void {
    this.getAllProduct();
    this.getAllCustomer();
    this.editOrderId = this.route.snapshot.params['id'];
    if(this.editOrderId != null){
      this.actionHeader = "Order Update Form";
      this.actionBtn = "Update";
      this.service.getOrderById(this.editOrderId).subscribe(item=>{
        this.editData = item;
        if(this.editData.orderDetails != null){
          for(let item of this.editData.orderDetails){
            this.EditOrderDetails(item);
          }
        }
        this.orderForm.setValue({
          id: this.editData.id,
          orderNo: this.editData.orderNo,
          customerId: this.editData.customerId, 
          totalPrice: this.editData.totalPrice,
          orderDetails: this.editData.orderDetails
        })
      })
    }
  }

  formOrderDetails !: FormArray<any>;
  listProducts: any;
  listCustomers: any;
  saveResponse: any;
  editData: any;
  editOrderId: any;
  actionBtn: string = "Save";
  actionHeader: string = "Order Create Form";
  mymodel: any;

  orderForm = this.formBuilder.group({
    id: 0,
    orderNo: this.formBuilder.control('', Validators.required),
    customerId: this.formBuilder.control('', Validators.required),
    totalPrice: this.formBuilder.control('', Validators.required),
    orderDetails: this.formBuilder.array([])
  })

  onChange(index:number){
    const subTotal = this.formOrderDetails.at(index).get('amount')?.value * this.formOrderDetails.at(index).get('prices')?.value;
    
    const total = this.orderDetails.value.reduce((acc: any,curr: any)=>{
        acc += (curr.amount || 0) * (curr.prices || 0);
        return acc;
    },0);
    this.orderForm.get('totalPrice')?.setValue(total);
  }

  redirectToList(){
    this.router.navigate(['orders']);
  }
  EditOrderDetails(item : any){
    this.formOrderDetails = this.orderForm.get("orderDetails") as FormArray;
    this.formOrderDetails.push(this.GenerateEditRow(item));
  }
  GenerateEditRow(item: any){
    return this.formBuilder.group({
      id: this.formBuilder.control(item.id),
      orderId: this.formBuilder.control(item.buyOrderId),
      productId: this.formBuilder.control(item.productId, Validators.required),
      amount: this.formBuilder.control(item.amount, Validators.required),
      prices: this.formBuilder.control(item.prices, Validators.required),
      createdDate: this.formBuilder.control(item.createdDate),
      createdBy: this.formBuilder.control(item.createdBy),
      modifiedDate: this.formBuilder.control(item.modifiedDate),
      modifiedBy: this.formBuilder.control(item.modifiedBy),
    })
  }
  AddOrderDetails(){
    this.formOrderDetails = this.orderForm.get("orderDetails") as FormArray;
    this.formOrderDetails.push(this.GenerateRow());
  }
  GenerateRow(){
    return this.formBuilder.group({
      id: this.formBuilder.control({value: 0, disabled: true}),
      productId: this.formBuilder.control('',Validators.required),
      amount: this.formBuilder.control('',Validators.required),
      prices: this.formBuilder.control('',Validators.required),
    })
  }
  get orderDetails(){
    return this.orderForm.get('orderDetails') as FormArray;
  }
  saveOrder(){
    if(this.orderForm.valid){
      if(!this.editData){
        this.CreateOrder();
      }else{
        this.UpdateOrder();
      }
    }else{
      this.notifyService.showWarning("Please complete all information!", "Warning");
    }
  }
  CreateOrder(){
    this.service.createOrders(this.orderForm.value).subscribe(res => {
      if(res == true){
        this.notifyService.showSuccess("Create order successfully!!", "Succcess");
        this.orderForm.reset();
        this.redirectToList();
      }else{
        this.notifyService.showError("Create order failed!!", "Error");
      }
    })
  }
  UpdateOrder(){
    this.service.updateOrders(this.orderForm.value).subscribe(res => {
      if(res == true){
        this.notifyService.showSuccess("Update order successfully!!", "Succcess");
        this.orderForm.reset();
        this.redirectToList();
      }else{
        this.notifyService.showError("Update order failed!!", "Error");
      }
    })
  }
  RemoveOrderDetails(index: any){
    if (confirm('Do you want to remove this BuyOrder Detail?')) {
      if(!this.editData){
        this.formOrderDetails = this.orderForm.get("orderDetails") as FormArray;
        this.formOrderDetails.removeAt(index);
        this.onChange(index);
      }else{
        this.formOrderDetails = this.orderForm.get("orderDetails") as FormArray;
        this.formOrderDetails.removeAt(index);
        this.onChange(index);
        if(this.editData.orderDetails[index]){
          this.service.deleteOrderById(this.editData.orderDetails[index].id).subscribe(res =>{
            if(res == true){
              this.notifyService.showSuccess("Delete order detail successfully!!", "Succcess");
            }else{
              this.notifyService.showError("Delete order detail failed!!", "Error");
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
  getAllCustomer(){
    this.service.getAllCustomers().subscribe({
      next: (data) => {
        if(data.status == 200){
          this.listCustomers = data.data;
        }
      },
      error: (err) => {
        alert("Error");
      }
    })
  }

}
