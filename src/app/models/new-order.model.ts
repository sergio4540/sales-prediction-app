// new-order.model.ts
export interface NewOrder {
  customerId: number;
  EmployeeId: number;
  shipperId: number;
  shipName: string;
  shipAddress: string;
  shipCity: string;
  orderDate: Date;
  requiredDate: Date;
  shippedDate: Date;
  freight: number;
  shipCountry: string;
  productId: number;
  unitPrice: number;
  Quantity: number;
  discount: number;

  // orderDetails: {
  //   productId: number;
  //   unitPrice: number;
  //   qty: number;
  //   discount: number;
  // }
}
