// customer.model.ts
export interface Customer {
  customer_Id: number;
  customer_Name: string;
  lastOrderDate: Date;
  nextPredictedOrder: Date;
}
