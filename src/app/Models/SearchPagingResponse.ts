import { SearchResult } from './SearchResult';
export class SearchPagingResponse{
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  hasPrevious: boolean;
  hasNext: boolean;
  items: SearchResult[];
}
