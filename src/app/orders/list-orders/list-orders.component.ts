import { Component, OnInit, DoCheck } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SharedService } from 'src/app/shared.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NotificationService } from 'src/app/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css']
})
export class ListOrdersComponent implements OnInit,DoCheck {

  displayedColumns: string[] = ['id','orderNo', 'customerId', 'totalPrice','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isListing=true;

  constructor(private dialog: MatDialog, private service: SharedService,private notifyService: NotificationService, private router: Router) { }

  ngOnInit(): void {
    this.getAllOrder();
    this.service.RefreshedData.subscribe(data =>{
      this.getAllOrder();
    })
  }

  EditOrder(id: any) {
    this.router.navigate(['orders/edit/'+id]);
  }
  ngDoCheck(): void {
    let currentUrl = this.router.url;
    if(currentUrl=='/orders'){
      this.isListing = true;
    }else{
      this.isListing = false;
    }
  }
  getAllOrder(){
    this.service.getAllOrders().subscribe({
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
  deleteOrder(id: any){
    if(confirm("Are you sure delete order?")){
      this.service.deleteOrders(id).subscribe(res => {
        if(res = true){
          this.notifyService.showSuccess("Delete order successfully!!", "Succcess");
          this.getAllOrder();
        }else{
          this.notifyService.showError("Delete order failed!!", "Error");
        }
      })
    }
  }

}
