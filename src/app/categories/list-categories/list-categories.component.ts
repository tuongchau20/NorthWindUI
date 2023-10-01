import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from 'src/app/shared.service';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/notification.service';
import { CreateEditCategoriesComponent } from '../create-edit-categories/create-edit-categories.component';

@Component({
  selector: 'app-list-categories', 
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css'], 
})
export class ListCategoriesComponent implements OnInit {
  displayedColumns: string[] = ['categoryId', 'categoryName', 'description', 'action']; 
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog, private service: SharedService, private notifyService: NotificationService) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  openDialog() {
    this.dialog.open(CreateEditCategoriesComponent, {
      width: '30%',
    }).afterClosed().subscribe((val) => {
      if (val == 'save') {
        this.getAllCategories();
      }
    });
  }

  getAllCategories() {
    this.service.getAllCategories().subscribe({
      next: (data) => {
        // if (data.status == 200) {
        //   console.log(data);
          
        //   this.dataSource = new MatTableDataSource(data);
        //   this.dataSource.sort = this.sort;
        //   this.dataSource.paginator = this.paginator;
        // }
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        alert('Error');
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

  editCategory(row: any) {
    this.dialog.open(CreateEditCategoriesComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe((val) => {
      if (val == 'update') {
        this.getAllCategories();
      }
    });
  }

  deleteCategory(categoryId: any) {
    if (confirm('Are you sure to delete this category?')) {
      this.service.deleteCategory(categoryId).subscribe((res) => {
        if (res.status == 200) {
          this.notifyService.showSuccess('Delete category successfully!!', 'Success');
          this.getAllCategories();
        } else {
          this.notifyService.showError('Delete category failed!!', 'Error');
        }
      });
    }
  }
}
