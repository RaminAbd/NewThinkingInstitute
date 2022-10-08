import { MultiLingual } from './MultiLingual.model';
export class News{
  id?: any;
  title: MultiLingual;
  description: MultiLingual;
  image?: any;
  createdAt: Date;
  isForSlider: boolean;
  videoURL?:string;
}
