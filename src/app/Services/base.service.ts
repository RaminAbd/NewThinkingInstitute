import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { ServiceResponse } from '../Models/ServiceResponse.model';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  protected BaseUrl = "http://maestro2034-001-site1.atempurl.com/api/";
  currentLang:string;
  langObj:any;
  http: HttpClient;
  constructor(http: HttpClient, translate:TranslateService){
    this.http = http;
    this.currentLang = translate.currentLang;
    this.langObj = {
      'Lang': this.currentLang
    }
  }
  get(url?:string, parameter?:any, paramsObj?:any){
    if(parameter!==null) {
     return this.http.get<ServiceResponse>(this.BaseUrl + url+ parameter)
    }
    else{
      return this.http.get<ServiceResponse>(this.BaseUrl + url, {params:paramsObj})
    }
  }
  post(url?:string, object?:any){
    return this.http.post<ServiceResponse>(this.BaseUrl + url, object);
  }
  delete(url?:string, parameter?:any){
    return this.http.delete<ServiceResponse>(this.BaseUrl + url + parameter)
  }
}
