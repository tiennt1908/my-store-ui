import { IResponse, List } from '../general/output.general';
import { GetCategoryListInput } from './category.input';
import { ICategory } from './category.output';
import { axiosCustom } from '../axios';

export const CATEGORY_API = {
  async getList(input: GetCategoryListInput): Promise<IResponse<List<ICategory[]>>> {
    const { data } = await axiosCustom.get('categories', {
      params: input,
    });

    return data;
  },
};
