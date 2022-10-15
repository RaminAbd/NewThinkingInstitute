import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { CustomerRequest } from '../Models/CustomerRequest';

@Injectable({
  providedIn: 'root'
})
export class CustomerRequestService extends BaseService {
  constructor(http: HttpClient, translate: TranslateService) { super(http, translate); }

  CreateRequest(object: CustomerRequest) {
    return this.post('CustomerRequests/CreateRequest/', object);
  }
  GetAllWithPaging(index:number){
    var obj = {
      'PageIndex': index,
      'PageSize':10,
      'Lang':'ka-Geo'
    };
    return this.get('CustomerRequests/GetAllWithPaging/', null, obj);
  }
  GetById(id:string){
    return this.get('CustomerRequests/GetById/', id, null)
  }
}
