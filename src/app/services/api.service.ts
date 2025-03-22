// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';
import { Order } from '../models/order.model';
import { Employee } from '../models/employee.model';
import { Shipper } from '../models/shipper.model';
import { Product } from '../models/product.model';
import { NewOrder } from '../models/new-order.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://localhost:7205/api'; // Ajustar según la URL de tu API

  constructor(private http: HttpClient) { }

  // Listar clientes con fecha de ultima orden y fecha de posible orden
  getCustomers(pageNumber: number = 1, pageSize: number = 10, sortBy: string = 'CustomerName', sortColumn: string = 'name', sortDirection: string = 'asc', filterValue: string = ''): Observable<any> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('sortBy', sortBy)
      .set('sortColumn', sortColumn)
      .set('sortDirection', sortDirection);

    if (filterValue) {
      params = params.set('filterValue', filterValue);
    }

    return this.http.get<any>(`${this.apiUrl}/Customer`, { params });
  }

  // Listar ordenes por cliente
  getOrdersByCustomer(customerId: number, page: number = 0, pageSize: number = 10, sortColumn: string = 'orderId', sortDirection: string = 'asc'): Observable<any> {
    // const params = new HttpParams()
    //   .set('page', page.toString())
    //   .set('pageSize', pageSize.toString())
    //   .set('sortColumn', sortColumn)
    //   .set('sortDirection', sortDirection);

    // return this.http.get<any>(`${this.apiUrl}/Orders/customer/${customerId}`, { params });
    return this.http.get<any>(`${this.apiUrl}/Orders/customer/${customerId}`);
  }

  // Listar todos los empleados
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/employees`);
  }

  // Listar todos los transportistas
  getShippers(): Observable<Shipper[]> {
    return this.http.get<Shipper[]>(`${this.apiUrl}/shippers`);
  }

  // Listar todos los productos
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  // Crear una orden nueva con un producto
  createOrder(order: NewOrder): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/orders`, order);
  }
}
