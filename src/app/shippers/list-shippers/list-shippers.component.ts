import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from 'src/app/shared.service';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/notification.service';
import { CreateEditShippersComponent } from '../create-edit-shippers/create-edit-shippers.component';

@Component({
  selector: 'app-list-shippers',
  templateUrl: './list-shippers.component.html',
  styleUrls: ['./list-shippers.component.css']
})
export class ListShippersComponent implements OnInit {
  displayedColumns: string[] = ['shipperId', 'shipperName', 'phone', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private service: SharedService, private notifyService: NotificationService) { }

  ngOnInit(): void {
    this.getAllShippers();
  }

  openDialog() {
    this.dialog.open(CreateEditShippersComponent, {
      width: '30%',
    }).afterClosed().subscribe(val => {
      if (val == 'save') {
        this.getAllShippers();
      }
    })
  }

  getAllShippers() {
    this.service.getAllShippers().subscribe({
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

  editShipper(row: any) {
    this.dialog.open(CreateEditShippersComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val == 'update') {
        this.getAllShippers();
      }
    })
  }

  deleteShipper(id: any) {
    if (confirm("Are you sure you want to delete this shipper?")) {
      this.service.deleteShipper(id).subscribe(res => {
        if (res.status == 200) {
          this.notifyService.showSuccess("Shipper deleted successfully!", "Success");
          this.getAllShippers();
        } else {
          this.notifyService.showError("Failed to delete shipper!", "Error");
        }
      })
    }
  }
}
