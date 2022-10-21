import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TeamService extends BaseService{
  constructor( http: HttpClient, translate:TranslateService) { super(http, translate); }
  Create(object:any){
    return this.post('TeamMembers/Create/', object);
  }
  Delete(newsItemId:string){
    return this.delete('TeamMembers/Delete/',newsItemId);
  }
  GetAll(lang:string){
    var obj = {
      'Lang':lang
    }
    return this.get('TeamMembers/GetAll/', null, obj)
  }
  GetById(id:string){
    return this.get('TeamMembers/GetById/', id, null);
  }
  Update(object:any){
    return this.post('TeamMembers/Update/',object);
  }
}
