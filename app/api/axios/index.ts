import { ACCESS_TOKEN } from "@/app/lib/static/storage.static";
import axios from "axios";

export const axiosCustom = axios.create({
  baseURL: "http://localhost:3000/api/",
  timeout: 2000,
});
export const axiosWithKey = () => {
  const accessTokenLocal = localStorage.getItem(ACCESS_TOKEN);

  return axios.create({
    baseURL: "http://localhost:3000/api/",
    timeout: 2000,
    headers: { Authorization: `Bearer ${accessTokenLocal}` },
  });
};
