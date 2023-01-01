export interface ApiPaginationResult<T = undefined> {
  data: T;
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface SwrResult<T = undefined> {
  data: T;
  error: unknown;
  isLoading: boolean | undefined;
}
