import { Photo } from './Photo';
export class PhotoPagingResponse{
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  hasPrevious: boolean;
  hasNext: boolean;
  items: Photo[];
}
