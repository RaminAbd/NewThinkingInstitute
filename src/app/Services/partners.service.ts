import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PartnersService extends BaseService{
  constructor( http: HttpClient, translate:TranslateService) { super(http, translate); }

  GetForm(){
    return this.get('Partner/GetForm', null, null);
  }
  GetAll(){
    var obj = {
      'Lang':this.currentLang
    }
    return this.get('Partner/GetAll', null, obj)
  }
  Delete(blogId:string){
    return this.delete('Partner/Delete/',blogId);
  }
  GetForUpdate(id:string){
    return this.get('Partner/GetForUpdate/',id, null);
  }
  Update(blogObject:any){
    return this.post('Partner/Update',blogObject);
  }
  GetBlogById(id:string){

    var obj = {
      'Id' : id,
      'Lang' : this.currentLang
    }
    return this.get('Partner/GetCourseById', null, obj);
  }
  Create(obj:any){
    return this.post('Partner/Create', obj)
  }
}
