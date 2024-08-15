export interface IProduct {
  id: number;
  name: string;
  slug: string;
  desc: string;
  imageindex: number;
  price: number;
  salePrice: number;
  salePercent: number;
  totalSupply: number;
  totalSold: number;
  isSaleOff: 0 | 1;
  categoryId: number;
  createAt: number;
}
export interface IProductImage {
  id: number;
  index: number;
  productId: number;
}

export interface IPropertyOption {
  id: number;
  value: string;
}
export interface IProperty {
  id: number;
  name: string;
  options: IPropertyOption[];
}
export interface IPropertyValueId {
  id: number;
  valueId: number;
}
export interface IPropertyOptionGroup {
  id: number;
  amount: number;
  options: IPropertyValueId[];
}
export interface GetProductPropertyListOutput {
  properties: IProperty[];
  optionGroup: IPropertyOptionGroup[];
}

export interface IProductCart {
  id: number;
  totalSupply: number;
  productId: number;
  slug: string;
  name: string;
  imageIndex: number;
  price: number;
  salePrice: number;
  isSaleOff: 0 | 1;
  properties: {
    id: number;
    name: string;
    optionSelected: {
      id: number;
      name: string;
    };
  }[];
}
