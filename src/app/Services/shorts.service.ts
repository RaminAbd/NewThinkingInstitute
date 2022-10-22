import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ShortsService extends BaseService {
  constructor( http: HttpClient, translate:TranslateService) { super(http, translate); }

  GetShorts(lang:string){
    return this.get('Shorts/GetShorts/',lang, null)
  }
}
