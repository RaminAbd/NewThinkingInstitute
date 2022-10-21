import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AccountsService extends BaseService{
  constructor( http: HttpClient, translate:TranslateService) { super(http, translate); }
  GetForm(){
    return this.get('Accounts/GetForm', null, null);
  }
  GetAll(){
    var obj = {
      'Lang':this.currentLang
    }
    return this.get('Accounts/GetAll', null, obj)
  }
  Delete(newsItemId:string){
    return this.delete('Accounts/Delete/',newsItemId);
  }
  GetForUpdate(id:string){
    return this.get('Accounts/GetForUpdate/',id, null);
  }
  Update(blogObject:any){
    return this.post('Accounts/Update',blogObject);
  }
  GetNewsById(id:string,lang:string){

    var obj = {
      'Id' : id,
      'Lang' :lang
    }
    return this.get('Accounts/GetNewsById', null, obj);
  }
  Create(obj:any){
    return this.post('Accounts/Create', obj)
  }
  GetAllWithPaging(index:number, lang:string){
    var obj = {
      'PageIndex': index,
      'PageSize':9,
      'Lang':lang
    };
    return this.get('Accounts/GetAllWithPaging/', null, obj);
  }
}
