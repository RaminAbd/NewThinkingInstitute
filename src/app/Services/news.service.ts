import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class NewsService extends BaseService {
  constructor(http: HttpClient, translate: TranslateService) { super(http, translate); }
  GetForm() {
    return this.get('News/GetForm', null, null);
  }
  GetAll(lang: string) {
    var obj = {
      'Lang': lang
    }
    return this.get('News/GetAll', null, obj)
  }
  Delete(newsItemId: string) {
    return this.delete('News/Delete/', newsItemId);
  }
  GetForUpdate(id: string) {
    return this.get('News/GetForUpdate/', id, null);
  }
  Update(blogObject: any) {
    return this.post('News/Update', blogObject);
  }
  GetNewsById(id: string, lang: string) {
    var obj = {
      'Id': id,
      'Lang': lang
    }
    return this.get('News/GetNewsById', null, obj);
  }
  Create(obj: any) {
    return this.post('News/Create', obj)
  }
  GetAllWithPaging(index: number, lang: string) {
    var obj = {
      'PageIndex': index,
      'PageSize': 9,
      'Lang': lang
    };
    return this.get('News/GetAllWithPaging/', null, obj);
  }
}
