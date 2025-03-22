// orders-view.component.ts
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from '../../models/order.model';
import { ApiService } from '../../services/api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-orders-view',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatOptionModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule
  ],
  templateUrl: './orders-view.component.html',
  styleUrls: ['./orders-view.component.scss']
})
export class OrdersViewComponent implements OnInit {
  displayedColumns: string[] = ['orderId', 'requiredDate', 'shippedDate', 'shipName', 'shipAddress', 'shipCity'];
  dataSource!: MatTableDataSource<Order>;
  orders: Order[] = [];
  totalItems = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private apiService: ApiService,
    public dialogRef: MatDialogRef<OrdersViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { customerId: number, customerName: string }
  ) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(pageIndex = 0, pageSize = 10, sortColumn = 'orderId', sortDirection = 'asc'): void {
    this.apiService.getOrdersByCustomer(this.data.customerId, pageIndex, pageSize, sortColumn, sortDirection)
      .subscribe(response => {
        this.orders = response.data;
        this.totalItems = response.pagination.totalItems;
        this.dataSource = new MatTableDataSource(this.orders);

        // Asegurar que el paginador y el sort se asignen correctamente
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
        // this.dataSource = new MatTableDataSource(response);
      });
  }

  onSortChange(): void {
    this.loadOrders(
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.sort.active,
      this.sort.direction
    );
  }

  onPageChange(event: any): void {
    this.loadOrders(
      event.pageIndex,
      event.pageSize,
      this.sort.active,
      this.sort.direction
    );
  }

  close(): void {
    this.dialogRef.close();
  }
}
