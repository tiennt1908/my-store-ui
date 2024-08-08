import { axiosWithKey } from "../axios";
import { IResponse } from "../general/output.general";
import { LoginInput, RegisterInput } from "./auth.input";
import { IAccessToken, IUser } from "./auth.output";

export const AUTH_API = {
  async login(input: LoginInput): Promise<IResponse<IAccessToken>> {
    const { data } = await axiosWithKey().post("auth/login", input);

    return data;
  },

  async register(input: RegisterInput): Promise<IResponse<IUser>> {
    const { data } = await axiosWithKey().post("auth/register", input);

    return data;
  },
};
