import { Accounts } from './Accounts';
export class AccountsPagingResponse{
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  hasPrevious: boolean;
  hasNext: boolean;
  items: Accounts[];
}
