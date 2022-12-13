import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CreateEditCustomersComponent } from '../create-edit-customers/create-edit-customers.component';
import { SharedService } from 'src/app/shared.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.css']
})
export class ListCustomersComponent implements OnInit {

  displayedColumns: string[] = ['id','customerName', 'email', 'phone', 'address','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog, private service: SharedService,private notifyService: NotificationService) { }

  ngOnInit(): void {
    this.getAllCustomer();
  }
  openDialog() {
    this.dialog.open(CreateEditCustomersComponent, {
      width: '30%',
    }).afterClosed().subscribe(val=>{
      if(val == 'save'){
        this.getAllCustomer();
      }
    })
  }
  getAllCustomer(){
    this.service.getAllCustomers().subscribe({
      next: (data) => {
        if(data.status ==200){
          this.dataSource = new MatTableDataSource(data.data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
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
  editCustomer(row: any){
    this.dialog.open(CreateEditCustomersComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val=>{
      if(val == 'update'){
        this.getAllCustomer();
      }
    })
  }
  deleteCustomer(id: any){
    if(confirm("Are you sure delete customer?")){
      this.service.deleteCustomers(id).subscribe(res => {
        if(res.status = 200){
          this.notifyService.showSuccess("Delete customer successfully!!", "Succcess");
          this.getAllCustomer();
        }else{
          this.notifyService.showError("Delete customer failed!!", "Error");
        }
      })
    }
  }

}
