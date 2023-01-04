import useSWR from "swr";
import { fetcher } from "../swr";
import { ApiPaginationResult, SwrResult } from "../type";
import { User } from "../../types/user";

export const useFollower = (
  page: number = 1,
  pageSize: number = 10
): SwrResult<ApiPaginationResult<User[]>> => {
  const { data, isLoading, error } = useSWR(
    `/users/all?page=${page}&pageSize=${pageSize}`,
    fetcher
  );

  return { data, isLoading, error };
};

export const useFollowing = (
  page: number = 1,
  pageSize: number = 10
): SwrResult<ApiPaginationResult<User[]>> => {
  const { data, isLoading, error } = useSWR(
    `/users/friends?page=${page}&pageSize=${pageSize}`,
    fetcher
  );

  return { data, isLoading, error };
};
