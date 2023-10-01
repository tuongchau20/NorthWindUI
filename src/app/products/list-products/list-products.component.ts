import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CreateEditProductsComponent } from '../create-edit-products/create-edit-products.component';
import { SharedService } from 'src/app/shared.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  displayedColumns: string[] = ['productId','productName', 'supplierId', 'categoryId', 'unit','price','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private dialog: MatDialog, private service: SharedService,private notifyService: NotificationService) { }

  ngOnInit(): void {
    this.getAllProduct();
  }
  openDialog() {
    this.dialog.open(CreateEditProductsComponent, {
      width: '30%',
    }).afterClosed().subscribe(val=>{
      if(val == 'save'){
        this.getAllProduct();
      }
    })
  }
  getAllProduct(){
    this.service.getAllProducts().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        
      },
      error: (err) => {
        alert("Error");
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  editProduct(row: any){
    this.dialog.open(CreateEditProductsComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val=>{
      if(val == 'update'){
        this.getAllProduct();
      }
    })
  }
  deleteProduct(id: any){
    if(confirm("Are you sure delete product?")){
      this.service.deleteProducts(id).subscribe(res => {
        if(res.status == 200){
          this.notifyService.showSuccess("Delete product successfully!!", "Succcess");
          this.getAllProduct();
        }else{
          this.notifyService.showError("Delete product failed!!", "Error");
        }
      })
    }
  }

}
