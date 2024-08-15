import { IResponse, List } from '../general/output.general';
import { GetCategoryListInput } from './category.input';
import { ICategory } from './category.output';
import { axiosCustom } from '../axios';
import { TIMER_UTILS } from '@/app/lib/utils/timer.utils';

export const CATEGORY_API = {
  async getList(input: GetCategoryListInput): Promise<IResponse<List<ICategory[]>>> {
    const { data } = await axiosCustom.get('categories', {
      params: input,
    });

    await TIMER_UTILS.sleep(1000);

    return data;
  },
};
