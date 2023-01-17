export interface ApiPaginationResult<T = undefined> {
  data: T;
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}
