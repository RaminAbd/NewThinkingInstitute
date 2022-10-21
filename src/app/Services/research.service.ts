import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ResearchService extends BaseService{
  constructor( http: HttpClient, translate:TranslateService) { super(http, translate); }
  GetForm(){
    return this.get('Research/GetForm', null, null);
  }
  GetAll(lang:string){
    var obj = {
      'Lang':lang
    }
    return this.get('Research/GetAll', null, obj)
  }
  Delete(newsItemId:string){
    return this.delete('Research/Delete/',newsItemId);
  }
  GetForUpdate(id:string){
    return this.get('Research/GetForUpdate/',id, null);
  }
  Update(blogObject:any){
    return this.post('Research/Update',blogObject);
  }
  GetProjectById(id:string, lang:string){

    var obj = {
      'Id' : id,
      'Lang' : lang
    }
    return this.get('Research/GetProjectById', null, obj);
  }
  Create(obj:any){
    return this.post('Research/Create', obj)
  }
  GetAllWithPaging(index:number, lang:string){
    var obj = {
      'PageIndex': index,
      'PageSize':9,
      'Lang':lang
    };
    return this.get('Research/GetAllWithPaging/', null, obj);
  }
}
