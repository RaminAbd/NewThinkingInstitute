import { Injectable } from '@angular/core';
import { BaseService } from '../Services/base.service';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService{
  authenticated:boolean = false;
  constructor( http: HttpClient, translate:TranslateService) { super(http, translate); }
  get isLoggedIn(): boolean {
    var token = localStorage.getItem("token");
    if (token !== null && token !== "" && token !== undefined) {
      this.authenticated = true;
    }
    else {
      this.authenticated = false;
    }
    return this.authenticated;
  }
  SignIn(obj:any){
    return this.post('Auth/SignIn',obj)
  }
}
