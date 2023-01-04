import useSWR from "swr";
import { fetcher } from "../swr";
import { ApiPaginationResult, SwrResult } from "../type";
import { User } from "../../types/user";

export const useSearchUser = (
  page: string = "1",
  pageSize: string = "10",
  keyword: string = ""
): SwrResult<ApiPaginationResult<User[]>> => {
  const { data, isLoading, error } = useSWR(
    `/users/all?page=${page}&pageSize=${pageSize}&keyword=${keyword}`,
    fetcher
  );

  return { data, isLoading, error };
};
