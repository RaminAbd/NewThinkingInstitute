import { Blog } from './Blog';

export class BlogsPagingResponse{
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  hasPrevious: boolean;
  hasNext: boolean;
  items: Blog[];
}
