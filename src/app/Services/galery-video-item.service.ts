import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class GaleryVideoItemService extends BaseService{
  constructor( http: HttpClient, translate:TranslateService) { super(http, translate); }

  Create(object:any){
    return this.post('GaleryVideoItem/Create/', object);
  }
  GetAll(lang:string){
    this.langObj.Lang = lang;
    return this.get('GaleryVideoItem/GetAll/', null,this.langObj)
  }
  Delete(id:string){
    return this.delete('GaleryVideoItem/Delete/', id);
  }
  GetForm(){
    return this.get('GaleryVideoItem/GetForm', null, null);
  }

}
