import { MultiLingual } from './MultiLingual.model';
export class News{
  id?: any;
  title: MultiLingual;
  description: MultiLingual;
  image?: any;
  createdAt: any;
  isForSlider: boolean;
  videoURL?:string;
}
