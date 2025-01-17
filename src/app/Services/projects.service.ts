import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService extends BaseService{
  constructor( http: HttpClient, translate:TranslateService) { super(http, translate); }
  GetForm(){
    return this.get('Project/GetForm', null, null);
  }
  GetAll(){
    var obj = {
      'Lang':this.currentLang
    }
    return this.get('Project/GetAll', null, obj)
  }
  Delete(newsItemId:string){
    return this.delete('Project/Delete/',newsItemId);
  }
  GetForUpdate(id:string){
    return this.get('Project/GetForUpdate/',id, null);
  }
  Update(blogObject:any){
    return this.post('Project/Update',blogObject);
  }
  GetProjectById(id:string, lang:string){

    var obj = {
      'Id' : id,
      'Lang' : lang
    }
    return this.get('Project/GetProjectById', null, obj);
  }
  Create(obj:any){
    return this.post('Project/Create', obj)
  }
  GetAllWithPaging(index:number, lang:string){
    var obj = {
      'PageIndex': index,
      'PageSize':9,
      'Lang':lang
    };
    return this.get('Project/GetAllWithPaging/', null, obj);
  }
}
