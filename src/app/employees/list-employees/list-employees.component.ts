import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from 'src/app/shared.service';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/notification.service';
import { CreateEditEmployeesComponent } from '../create-edit-employees/create-edit-employees.component';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  displayedColumns: string[] = ['employeeId', 'lastName', 'firstName', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private service: SharedService, private notifyService: NotificationService) { }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  openDialog() {
    this.dialog.open(CreateEditEmployeesComponent, {
      width: '30%',
    }).afterClosed().subscribe(val => {
      if (val == 'save') {
        this.getAllEmployees();
      }
    });
  }

  getAllEmployees() {
    this.service.getAllEmployees().subscribe({
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

  editEmployee(row: any) {
    this.dialog.open(CreateEditEmployeesComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val == 'update') {
        this.getAllEmployees();
      }
    });
  }

  deleteEmployee(employeeId: any) {
    if (confirm("Are you sure you want to delete this employee?")) {
      this.service.deleteEmployee(employeeId).subscribe(res => {
        if (res.status == 200) {
          this.notifyService.showSuccess("Employee deleted successfully!", "Success");
          this.getAllEmployees();
        } else {
          this.notifyService.showError("Failed to delete employee!", "Error");
        }
      });
    }
  }
}
