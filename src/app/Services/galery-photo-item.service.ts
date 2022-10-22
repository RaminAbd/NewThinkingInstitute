import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GaleryPhotoItemService extends BaseService{
  constructor( http: HttpClient, translate:TranslateService) { super(http, translate); }

  Create(object:any){
    return this.post('GaleryPhotoItem/Create/', object);
  }
  GetAll(){
    return this.get('GaleryPhotoItem/GetAll/', null,this.langObj)
  }
  Delete(id:string){
    return this.delete('GaleryPhotoItem/Delete/', id);
  }
  GetForm(){
    return this.get('GaleryPhotoItem/GetForm', null, null);
  }
  GetAllWithPaging(index:number){
    var obj = {
      'PageIndex': index,
      'PageSize':9,
      'Lang':this.currentLang
    };
    return this.get('GaleryPhotoItem/GetAllWithPaging/', null, obj);
  }
}
