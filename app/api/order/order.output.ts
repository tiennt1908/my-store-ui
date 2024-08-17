export interface IOrder {
  id: number;
  recipientName: string;
  address: string;
  phoneNumber: string;
  createAt: number;
  userId?: number;
  statusId: number;
  statusName: string;
}

export interface INameId {
  id: number;
  name: string;
}
export interface IProperty extends INameId {
  optionSelected: INameId;
}
export interface IOrderItem {
  id: number;
  name: string;
  slug: string;
  imageIndex: number;
  price: number;
  priceAtOrder: number;
  amount: number;
  properties: IProperty[];
}
export interface IOrderDetail extends IOrder {
  items: IOrderItem[];
}
