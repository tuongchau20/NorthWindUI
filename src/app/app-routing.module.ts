import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { BuyordersComponent } from './buyorders/buyorders.component';
import { HandleBuyordersComponent } from './buyorders/handle-buyorders/handle-buyorders.component';
import { OrdersComponent } from './orders/orders.component';
import { HandleOrdersComponent } from './orders/handle-orders/handle-orders.component';
import { CategoriesComponent } from './categories/categories.component';
import { ShippersComponent } from './shippers/shippers.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { EmployeesComponent } from './employees/employees.component';

const routes: Routes = [
  {path: "products", component: ProductsComponent},
  {path: "customers", component: CustomersComponent},
  {path: "buyorders", component: BuyordersComponent, children: [
    {path: "create", component: HandleBuyordersComponent},
    {path: "edit/:id", component: HandleBuyordersComponent}
  ]},
  { path: "categories", component: CategoriesComponent},
  { path: "shippers", component: ShippersComponent},
  { path: "suppliers", component: SuppliersComponent},
  { path: "employees", component: EmployeesComponent},


  {path: "orders", component: OrdersComponent, children: [
    {path: "create", component: HandleOrdersComponent},
    {path: "edit/:id", component: HandleOrdersComponent},
  ]},
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
