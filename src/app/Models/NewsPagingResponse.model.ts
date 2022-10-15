import { News } from './News';
export class NewsPagingResponse{
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  hasPrevious: boolean;
  hasNext: boolean;
  items: News[];
}
