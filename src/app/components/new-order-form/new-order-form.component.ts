import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

import { Employee } from '../../models/employee.model';
import { Shipper } from '../../models/shipper.model';
import { Product } from '../../models/product.model';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { MatOption } from '@angular/material/autocomplete';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
  MatOptionModule,
  NativeDateAdapter
} from '@angular/material/core';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule, MatSpinner } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
// Define los formatos de fecha (opcional si quieres personalizar)
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-new-order-form',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ],
  templateUrl: './new-order-form.component.html',
  styleUrls: ['./new-order-form.component.scss']
})
export class NewOrderFormComponent implements OnInit {
  orderForm!: FormGroup;
  employees: Employee[] = [];
  shippers: Shipper[] = [];
  products: Product[] = [];
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<NewOrderFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { customerId: number, customerName: string }
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.loadLookupData();
  }

  createForm(): void {
    this.orderForm = this.fb.group({
      // Order information
      empId: ['', Validators.required],
      shipperId: ['', Validators.required],
      shipName: ['', Validators.required],
      shipAddress: ['', Validators.required],
      shipCity: ['', Validators.required],
      shipCountry: ['', Validators.required],
      orderDate: [new Date(), Validators.required],
      requiredDate: ['', Validators.required],
      shippedDate: [''],
      freight: [0, [Validators.required, Validators.min(0)]],

      // Order details
      productId: ['', Validators.required],
      unitPrice: [0, [Validators.required, Validators.min(0.01)]],
      qty: [1, [Validators.required, Validators.min(1)]],
      discount: [0, [Validators.required, Validators.min(0), Validators.max(1)]]
    });
  }

  loadLookupData(): void {
    // Load employees
    this.apiService.getEmployees().subscribe(employees => {
      this.employees = employees;
    });

    // Load shippers
    this.apiService.getShippers().subscribe(shippers => {
      this.shippers = shippers;
    });

    // Load products
    this.apiService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  onSubmit(): void {
    if (this.orderForm.invalid) {
      return;
    }

    this.isSubmitting = true;

    const formValue = this.orderForm.value;
    const newOrder = {
      customerId: this.data.customerId,
      EmployeeId: formValue.empId,
      shipperId: formValue.shipperId,
      shipName: formValue.shipName,
      shipAddress: formValue.shipAddress,
      shipCity: formValue.shipCity,
      shipCountry: formValue.shipCountry,
      orderDate: formValue.orderDate,
      requiredDate: formValue.requiredDate,
      shippedDate: formValue.shippedDate || null,
      freight: formValue.freight,
      productId: formValue.productId,
      unitPrice: formValue.unitPrice,
      Quantity: formValue.qty,
      discount: formValue.discount
      // orderDetails: {
      //   productId: formValue.productId,
      //   unitPrice: formValue.unitPrice,
      //   qty: formValue.qty,
      //   discount: formValue.discount
      // }
    };

    this.apiService.createOrder(newOrder).subscribe(
      response => {
        this.isSubmitting = false;
        // Mostramos el mensaje de éxito
        this.snackBar.open('La orden se ha guardado exitosamente', 'Cerrar', {
          duration: 5000, // Duración de 5 segundos
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['success-snackbar'] // Clase CSS opcional para estilizar
        });
        this.dialogRef.close(true);
      },
      error => {
        this.isSubmitting = false;
        console.error('Error creating order:', error);
        // Mostramos un mensaje de error
        this.snackBar.open('Error al guardar la orden', 'Cerrar', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['error-snackbar'] // Clase CSS opcional para estilizar
        });
      }
    );
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
