import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogService extends BaseService{
  constructor( http: HttpClient, translate:TranslateService) { super(http, translate); }

  GetForm(){
    return this.get('Blog/GetForm', null, null);
  }
  GetAll(lang:string){
    var obj = {
      'Lang':lang
    }
    return this.get('Blog/GetAll', null, obj)
  }
  Delete(blogId:string){
    return this.delete('Blog/Delete/',blogId);
  }
  GetForUpdate(id:string){
    return this.get('Blog/GetForUpdate/',id, null);
  }
  Update(blogObject:any){
    return this.post('Blog/Update',blogObject);
  }
  GetBlogById(id:string, lang:string){

    var obj = {
      'Id' : id,
      'Lang' : lang
    }
    return this.get('Blog/GetBlogById', null, obj);
  }
  Create(obj:any){
    return this.post('Blog/Create', obj)
  }
  GetAllWithPaging(index:number, lang:string){
    var obj = {
      'PageIndex': index,
      'PageSize':9,
      'Lang':lang
    };
    return this.get('Blog/GetAllWithPaging/', null, obj);
  }
}
