import { Tag } from "../../types/tag";
import api from "../index";

export const getTags = async (): Promise<Tag[]> => {
  const { data } = await api.get(`/tags`);

  return data;
};
