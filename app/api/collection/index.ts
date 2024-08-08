import { axiosCustom } from "../axios";
import { IResponse, List } from "../general/output.general";
import { GetCollectionListInput } from "./collection.input";
import { ICollection } from "./collection.output";

export const COLLECTION_API = {
  async getList(
    input: GetCollectionListInput
  ): Promise<IResponse<List<ICollection[]>>> {
    const { data } = await axiosCustom.get("collections", {
      params: input,
    });

    return data;
  },
};
