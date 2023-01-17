import { ApiPaginationResult } from "../type";
import { User } from "../../types/user";
import api from "../index";

export const getFollowerUser = async (
  page: number = 1,
  pageSize: number = 10
): Promise<ApiPaginationResult<User[]>> => {
  const { data } = await api.get(
    `/users/all?page=${page}&pageSize=${pageSize}`
  );

  return data;
};

export const getFollowingUser = async (
  page: number = 1,
  pageSize: number = 10
): Promise<ApiPaginationResult<User[]>> => {
  const { data } = await api.get(
    `/users/friends?page=${page}&pageSize=${pageSize}`
  );

  return data;
};
