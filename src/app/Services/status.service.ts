import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatusService extends BaseService{
  constructor( http: HttpClient, translate:TranslateService) { super(http, translate); }
  GetForm(){
    return this.get('Status/GetForm', null, null);
  }
  GetAll(){
    var obj = {
      'Lang':this.currentLang
    }
    return this.get('Status/GetAll', null, obj)
  }
  Delete(newsItemId:string){
    return this.delete('Status/Delete/',newsItemId);
  }
  GetForUpdate(id:string){
    return this.get('Status/GetForUpdate/',id, null);
  }
  Update(blogObject:any){
    return this.post('Status/Update',blogObject);
  }
  GetNewsdById(id:string){

    var obj = {
      'Id' : id,
      'Lang' : this.currentLang
    }
    return this.get('Status/GetStatusById', null, obj);
  }
  Create(obj:any){
    return this.post('Status/Create', obj)
  }
}
