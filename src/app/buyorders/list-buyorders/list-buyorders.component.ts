import { Component, OnInit, DoCheck } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SharedService } from 'src/app/shared.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NotificationService } from 'src/app/notification.service';
import { CreateEditBuyordersComponent } from '../create-edit-buyorders/create-edit-buyorders.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-buyorders',
  templateUrl: './list-buyorders.component.html',
  styleUrls: ['./list-buyorders.component.css']
})
export class ListBuyordersComponent implements OnInit,DoCheck {
  displayedColumns: string[] = ['id','orderNo', 'buyerName', 'totalPrice','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isListing=true;
  currentPage = 1;
  pageSize = 2;
  totalPage = 0;
  pageField: any[] = [];
  btnPrevDisabled = false;
  btnNextDisabled = false;

  constructor(private dialog: MatDialog, private service: SharedService,private notifyService: NotificationService, private router: Router) { }

  ngOnInit(): void {
    this.getAllBuyOrder();
    this.service.RefreshedData.subscribe(data =>{
      this.getAllBuyOrder();
    })
  }
  EditBuyOrder(id: any) {
    this.router.navigate(['buyorders/edit/'+id]);
  }
  ngDoCheck(): void {
    let currentUrl = this.router.url;
    if(currentUrl=='/buyorders'){
      this.isListing = true;
    }else{
      this.isListing = false;
    }
  }
  openDialog() {
    this.dialog.open(CreateEditBuyordersComponent, {
      width: '60%',
    }).afterClosed().subscribe(val=>{
      if(val == 'save'){
        this.getAllBuyOrder();
      }
    })
  }
  getAllBuyOrder(){
    this.service.getAllBuyOrders(this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.totalPage = data.totalPage;
        this.dataSource = new MatTableDataSource(data.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        if(this.pageField <= data.totalPage){
          for(let index = 1; index <= data.totalPage; index++){
            this.pageField.push(index);
          }
        }
      },
      error: (err) => {
        alert("Error");
      }
    })
  }
  onPrev(){
    // console.log(this.currentPage);
    
    // if(this.currentPage > 1){
      this.currentPage--;
      this.getAllBuyOrder();
    //   this.btnPrevDisabled = false;
    // }
  }
  onNext(){
      this.currentPage++;
      this.getAllBuyOrder();
  }
  onPageClick(i: any){
    this.currentPage = i+1;
    this.getAllBuyOrder();
  }
  // getAllBuyOrder(){
  //   this.service.getAllBuyOrders().subscribe({
  //     next: (data) => {
  //       this.dataSource = new MatTableDataSource(data);
  //       this.dataSource.sort = this.sort;
  //       this.dataSource.paginator = this.paginator;
  //     },
  //     error: (err) => {
  //       alert("Error");
  //     }
  //   })
  // }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  editBuyOrder(row: any){
    this.dialog.open(CreateEditBuyordersComponent, {
      width: '60%',
      data: row
    }).afterClosed().subscribe(val=>{
      if(val == 'update'){
        this.getAllBuyOrder();
      }
    })
  }
  deleteBuyOrder(id: any){
    if(confirm("Are you sure delete product?")){
      this.service.deleteBuyOrders(id).subscribe(res => {
        if(res = true){
          this.notifyService.showSuccess("Delete buyorder successfully!!", "Succcess");
          this.getAllBuyOrder();
        }else{
          this.notifyService.showError("Delete buyorder failed!!", "Error");
        }
      })
    }
  }

}
