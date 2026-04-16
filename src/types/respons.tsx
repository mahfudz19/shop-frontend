// Sesuaikan dengan struct Pagination di Golang
export interface PaginationData {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

// Sesuaikan dengan struct MetaData di Golang
export interface MetaData {
  timestamp: string;
  request_id: string;
}

export interface MetaDataPagination extends MetaData {
  pagination: PaginationData;
}

// Sesuaikan dengan struct BaseResponse di Golang
export interface ResponsePaginate<T> {
  success: boolean;
  status: number;
  message: string;
  data: T[];
  meta: MetaDataPagination;
}
export interface Response<T> {
  success: boolean;
  status: number;
  message: string;
  data: T;
  meta: MetaData;
}
