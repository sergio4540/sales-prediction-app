// order.model.ts
export interface Order {
  orderId: number;
  requiredDate: Date;
  shippedDate: Date;
  shipName: string;
  shipAddress: string;
  shipCity: string;
}
