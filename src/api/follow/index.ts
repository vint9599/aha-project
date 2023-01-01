import useSWR from "swr";
import { fetcher } from "../swr";
import { ApiPaginationResult, SwrResult } from "../type";
import { FollowUser } from "../../types/follow";

export const useFollower = (
  page: number = 1,
  pageSize: number = 10
): SwrResult<ApiPaginationResult<FollowUser[]>> => {
  const { data, isLoading, error } = useSWR(
    `/users/all?page=${page}&pageSize=${pageSize}`,
    fetcher
  );

  return { data, isLoading, error };
};

export const useFollowing = (
  page: number = 1,
  pageSize: number = 10
): SwrResult<ApiPaginationResult<FollowUser[]>> => {
  const { data, isLoading, error } = useSWR(
    `/users/friends?page=${page}&pageSize=${pageSize}`,
    fetcher
  );

  return { data, isLoading, error };
};
