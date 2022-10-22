import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService extends BaseService {
  constructor( http: HttpClient, translate:TranslateService) { super(http, translate); }
  Search(text:string, language:string){
    var obj={
      'Lang':language,
      'Text':text
    }
    return this.get('Searches/Search/', null, obj)
  }
  GetAllWithPaging(index:number, lang:string, text:string){
    var obj = {
      'PageIndex': index,
      'PageSize':9,
      'Lang':lang,
      'Text':text
    };
    console.log(obj);

    return this.get('Searches/SearchWithPaging/', null, obj);
  }
}
