import { Component, OnInit } from '@angular/core';
import { CustomerRequestService } from '../../../Services/customer-request.service';
import { CustomerRequest } from '../../../Models/CustomerRequest';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class AdminRequestsComponent implements OnInit {
  Requests:CustomerRequest[]=[];
  Request:CustomerRequest = new CustomerRequest();
  constructor(private service:CustomerRequestService) { }

  ngOnInit(): void {
    this.getAllrequests(1);
  }
  getAllrequests(index: number){
    this.service.GetAllWithPaging(index).subscribe(resp=>{
      console.log(resp);
      this.Requests = resp.data.items;
      this.Request = this.Requests[0]
    })
  }
  getById(id:string){
    this.service.GetById(id).subscribe(resp=>{
      console.log(resp);
      this.Request = resp.data;
    })
  }
}
