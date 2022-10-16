import { MultiLingual } from './MultiLingual.model';
export class Blog {
  id?: any;
  title: MultiLingual;
  description: MultiLingual;
  createdAt: Date;
  image?: any;
  authorImage?:any;
  author: string;
}
