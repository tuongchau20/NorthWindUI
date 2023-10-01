import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from 'src/app/shared.service';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/notification.service';
import { CreateEditSuppliersComponent } from '../create-edit-suppliers/create-edit-suppliers.component';

@Component({
  selector: 'app-list-suppliers',
  templateUrl: './list-suppliers.component.html',
  styleUrls: ['./list-suppliers.component.css']
})
export class ListSuppliersComponent implements OnInit {
  displayedColumns: string[] = ['supplierId', 'supplierName', 'phone', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private service: SharedService, private notifyService: NotificationService) { }

  ngOnInit(): void {
    this.getAllSuppliers(); 
  }

  openDialog() {
    this.dialog.open(CreateEditSuppliersComponent, {
      width: '30%',
    }).afterClosed().subscribe(val => {
      if (val == 'save') {
        this.getAllSuppliers(); 
      }
    });
  }

  getAllSuppliers() {
    this.service.getAllSuppliers().subscribe({ 
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        alert("Error");
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editSupplier(row: any) {
    this.dialog.open(CreateEditSuppliersComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val == 'update') {
        this.getAllSuppliers();
      }
    });
  }

  deleteSupplier(id: any) {
    if (confirm("Are you sure you want to delete this supplier?")) {
      this.service.deleteSupplier(id).subscribe(res => { 
        if (res.status == 200) {
          this.notifyService.showSuccess("Supplier deleted successfully!", "Success"); 
          this.getAllSuppliers(); 
        } else {
          this.notifyService.showError("Failed to delete supplier!", "Error"); 
        }
      });
    }
  }
}
