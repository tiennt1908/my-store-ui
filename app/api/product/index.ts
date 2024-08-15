import { axiosCustom } from '../axios';
import { IResponse, List } from '../general/output.general';
import { GetProductCartByPropertyGroupIdsInput, GetProductImagesInput, GetProductInput, GetProductListInput } from './product.input';
import { GetProductPropertyListOutput, IProduct, IProductCart, IProductImage } from './product.output';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export const PRODUCT_API = {
  async getList(input: GetProductListInput): Promise<IResponse<List<IProduct[]>>> {
    const { data } = await axiosCustom.get('products', {
      params: input,
    });

    return data;
  },

  async getProductDetail(input: GetProductInput): Promise<IResponse<IProduct>> {
    const { data } = await axiosCustom.get('products/detail', {
      params: input,
    });

    return data;
  },

  async getProductImages(input: GetProductImagesInput): Promise<IResponse<IProductImage[]>> {
    const { data } = await axiosCustom.get('products/images', {
      params: input,
    });

    return data;
  },

  async getProductPropertyList(input: GetProductImagesInput): Promise<IResponse<GetProductPropertyListOutput>> {
    const { data } = await axiosCustom.get('products/properties', {
      params: input,
    });

    return data;
  },

  async getProductCartByPropertyGroupIds(input: GetProductCartByPropertyGroupIdsInput): Promise<IResponse<IProductCart[]>> {
    const { data } = await axiosCustom.post('products/cart', input);

    return data;
  },
};
