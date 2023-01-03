import api from ".";
import { Key } from "swr";

export const fetcher = async (url: Key) => {
  if (typeof url === "string") {
    let res = await api.get(url).then((res) => res.data);
    return res;
  }

  throw new Error("fetcher url need to be string");
};
