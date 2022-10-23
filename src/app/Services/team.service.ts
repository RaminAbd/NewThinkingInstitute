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
  // GetAll(lang:string){
  //   var obj = {
  //     'Lang':lang
  //   }
  //   return this.get('TeamMembers/GetAll/', null, obj)
  // }
  GetById(id:string){
    return this.get('TeamMembers/GetById/', id, null);
  }
  Update(object:any){
    return this.post('TeamMembers/Update/',object);
  }
  GetForm(){
    return this.get('TeamMembers/GetForm', null, null);
  }
  GetForUpdate(id:string){
    return this.get('TeamMembers/GetForUpdate/',id, null);
  }
  GetAll(lang:string){
    return this.get('TeamMembers/GetAll/',lang, null)
  }
  CreateWithForm(form:any){
    return this.post('TeamMembers/CreateWithForm', form);
  }
  UpdateWithForm(obj:any){
    return this.post('TeamMembers/UpdateWithForm', obj);
  }
}
