import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService extends BaseService{
  constructor( http: HttpClient, translate:TranslateService) { super(http, translate); }

  GetForm(){
    return this.get('Service/GetForm', null, null);
  }
  GetAll(lang:string){
    var obj = {
      'Lang':lang
    }
    return this.get('Service/GetAll', null, obj)
  }
  Delete(blogId:string){
    return this.delete('Service/Delete/',blogId);
  }
  GetForUpdate(id:string){
    return this.get('Service/GetForUpdate/',id, null);
  }
  Update(blogObject:any){
    return this.post('Service/Update',blogObject);
  }
  GetById(id:string, lang:string){


    var obj = {
      'Id' : id,
      'Lang' : lang
    }
    console.log(obj);
    return this.get('Service/GetServiceById', null, obj);
  }
  Create(obj:any){
    return this.post('Service/Create', obj)
  }
}
