import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { BuyordersComponent } from './buyorders/buyorders.component';
import { ViewDetailBuyordersComponent } from './buyorders/view-detail-buyorders/view-detail-buyorders.component';

const routes: Routes = [
  {path: "products", component: ProductsComponent},
  {path: "customers", component: CustomersComponent},
  {path: "buyorders", component: BuyordersComponent},
  {path: "buyorders/:id", component: ViewDetailBuyordersComponent},
]

@NgModule({
  // declarations: [],
  // imports: [
  //   CommonModule
  // ]
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
