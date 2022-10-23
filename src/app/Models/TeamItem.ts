import { MultiLingual } from './MultiLingual.model';
export class TeamItem{
  id?:string;
  fullName: MultiLingual;
  image: any;
  position: MultiLingual;
  contactMobile: string;
  email: string;
  facebookLink: string;
  address: string;
  isFounder: boolean;
}
