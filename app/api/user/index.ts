import { axiosWithKey } from "../axios";
import { IResponse } from "../general/output.general";
import { IUser } from "./user.output";

export const USER_API = {
  async get(): Promise<IResponse<IUser>> {
    const { data } = await axiosWithKey().get("users");

    return data;
  },
};
