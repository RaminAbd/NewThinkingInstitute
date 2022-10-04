import { MultiLingual } from './MultiLingual.model';
import { ProjectStatus } from './ProjectStatus';
export class Project{
  id?: any;
  title: MultiLingual;
  description: MultiLingual;
  image?: any;
  duration: string;
  isForSlider: boolean;
  status:ProjectStatus;
}
