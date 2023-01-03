import useSWR from "swr";
import { fetcher } from "../swr";
import { SwrResult } from "../type";
import { Tag } from "../../types/tag";

export const useTag = (): SwrResult<Tag[]> => {
  const { data, isLoading, error } = useSWR(`/tags`, fetcher);

  return { data, isLoading, error };
};
