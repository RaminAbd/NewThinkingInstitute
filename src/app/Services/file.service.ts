import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService  extends BaseService{
  constructor( http: HttpClient, translate:TranslateService) { super(http, translate); }
  Create(file:any){
    return this.post('Files/Create', file)
  }
  DownloadFile(id:string){
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.get(this.BaseUrl + `Files/DownloadFile/${id}`, { headers: headers, responseType: 'blob' });
  }
}
