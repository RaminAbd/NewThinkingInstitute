import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursesService extends BaseService{
  constructor( http: HttpClient, translate:TranslateService) { super(http, translate); }

  GetForm(){
    return this.get('Courses/GetForm', null, null);
  }
  GetAll(){
    var obj = {
      'Lang':this.currentLang
    }
    return this.get('Courses/GetAll', null, obj)
  }
  Delete(blogId:string){
    return this.delete('Courses/Delete/',blogId);
  }
  GetForUpdate(id:string){
    return this.get('Courses/GetForUpdate/',id, null);
  }
  Update(blogObject:any){
    return this.post('Courses/Update',blogObject);
  }
  GetBlogById(id:string){

    var obj = {
      'Id' : id,
      'Lang' : this.currentLang
    }
    return this.get('Courses/GetCourseById', null, obj);
  }
  Create(obj:any){
    return this.post('Courses/Create', obj)
  }
}
