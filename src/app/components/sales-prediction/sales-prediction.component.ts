// sales-prediction.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Customer } from '../../models/customer.model';
import { ApiService } from '../../services/api.service';
import { OrdersViewComponent } from '../orders-view/orders-view.component';
import { NewOrderFormComponent } from '../new-order-form/new-order-form.component';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sales-prediction',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './sales-prediction.component.html',
  styleUrls: ['./sales-prediction.component.scss']
})
export class SalesPredictionComponent implements OnInit {
  displayedColumns: string[] = ['name', 'lastOrderDate', 'nextPredictedOrder', 'actions'];
  dataSource!: MatTableDataSource<Customer>;
  customers: Customer[] = [];
  totalItems = 0;
  filterValue = new FormControl('');

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadCustomers();

    // Filter setup with debounce
    this.filterValue.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.loadCustomers(0, this.paginator.pageSize, this.sort.active, this.sort.direction, value || '');
      });
  }

  loadCustomers(pageIndex = 0, pageSize = 10, sortColumn = 'name', sortDirection = 'asc', filter = ''): void {
    this.apiService.getCustomers(pageIndex, pageSize, sortColumn, sortDirection, filter)
      .subscribe(response => {
        // this.customers = response;
        // this.totalItems = response.length;
        this.customers = response.data;
        this.totalItems = response.pagination.totalItems;
        this.dataSource = new MatTableDataSource(this.customers);
        // this.dataSource = new MatTableDataSource(response);
      });
  }

  onSortChange(): void {
    this.loadCustomers(
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.sort.active,
      this.sort.direction,
      this.filterValue.value || ''
    );
  }

  onPageChange(event: any): void {
    this.loadCustomers(
      event.pageIndex,
      event.pageSize,
      this.sort.active,
      this.sort.direction,
      this.filterValue.value || ''
    );
  }

  viewOrders(customer: Customer): void {
    this.dialog.open(OrdersViewComponent, {
      width: '900px',
      data: { customerId: customer.customer_Id, customerName: customer.customer_Name }
    });
  }

  createNewOrder(customer: Customer): void {
    const dialogRef = this.dialog.open(NewOrderFormComponent, {
      width: '600px',
      data: { customerId: customer.customer_Id, customerName: customer.customer_Name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Reload customers to update the prediction
        this.loadCustomers(
          this.paginator.pageIndex,
          this.paginator.pageSize,
          this.sort.active,
          this.sort.direction,
          this.filterValue.value || ''
        );
      }
    });
  }
}
