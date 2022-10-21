import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrainingsService extends BaseService{
  constructor( http: HttpClient, translate:TranslateService) { super(http, translate); }

  GetForm(){
    return this.get('Training/GetForm', null, null);
  }
  GetAll(lang:string){
    var obj = {
      'Lang':lang
    }
    return this.get('Training/GetAll', null, obj)
  }
  Delete(blogId:string){
    return this.delete('Training/Delete/',blogId);
  }
  GetForUpdate(id:string){
    return this.get('Training/GetForUpdate/',id, null);
  }
  Update(blogObject:any){
    return this.post('Training/Update',blogObject);
  }
  GetById(id:string, lang:string){

    var obj = {
      'Id' : id,
      'Lang' : lang
    }
    return this.get('Training/GetTrainingById/', null, obj);
  }
  Create(obj:any){
    return this.post('Training/Create', obj)
  }
}
