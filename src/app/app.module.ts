import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { ProductsComponent } from './products/products.component';
import { ListProductsComponent } from './products/list-products/list-products.component';
import { CreateEditProductsComponent } from './products/create-edit-products/create-edit-products.component';
import { CustomersComponent } from './customers/customers.component';
import { ListCustomersComponent } from './customers/list-customers/list-customers.component';
import { CreateEditCustomersComponent } from './customers/create-edit-customers/create-edit-customers.component';
import { AppRoutingModule } from './app-routing.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { ToastrModule } from 'ngx-toastr';
import { BuyordersComponent } from './buyorders/buyorders.component';
import { ListBuyordersComponent } from './buyorders/list-buyorders/list-buyorders.component';
import { CreateEditBuyordersComponent } from './buyorders/create-edit-buyorders/create-edit-buyorders.component';
import {MatSelectModule} from '@angular/material/select';
import { HandleBuyordersComponent } from './buyorders/handle-buyorders/handle-buyorders.component';
import {MatCardModule} from '@angular/material/card';
import { OrdersComponent } from './orders/orders.component';
import { ListOrdersComponent } from './orders/list-orders/list-orders.component';
import { HandleOrdersComponent } from './orders/handle-orders/handle-orders.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { CategoriesComponent } from './categories/categories.component';
import { ListCategoriesComponent } from './categories/list-categories/list-categories.component';
import { CreateEditCategoriesComponent } from './categories/create-edit-categories/create-edit-categories.component';
import { ShippersComponent } from './shippers/shippers.component';
import { ListShippersComponent } from './shippers/list-shippers/list-shippers.component';
import { CreateEditShippersComponent } from './shippers/create-edit-shippers/create-edit-shippers.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ListProductsComponent,
    CreateEditProductsComponent,
    CustomersComponent,
    ListCustomersComponent,
    CreateEditCustomersComponent,
    BuyordersComponent,
    ListBuyordersComponent,
    CreateEditBuyordersComponent,
    HandleBuyordersComponent,
    OrdersComponent,
    ListOrdersComponent,
    HandleOrdersComponent,
    CategoriesComponent,
    ListCategoriesComponent,
    CreateEditCategoriesComponent,
    ShippersComponent,
    ListShippersComponent,
    CreateEditShippersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      closeButton: true,
      progressBar: true,
    }),
    MatSelectModule,
    MatCardModule,
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
