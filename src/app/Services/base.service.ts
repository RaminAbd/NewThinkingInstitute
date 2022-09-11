import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  protected BaseUrl = "https://favoritstudents.azurewebsites.net/api/";
  constructor() { }
}
