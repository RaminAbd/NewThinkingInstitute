import { Component, OnInit } from '@angular/core';
import { CustomerRequestService } from '../../../Services/customer-request.service';
import { CustomerRequest } from '../../../Models/CustomerRequest';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class AdminRequestsComponent implements OnInit {
  Requests:CustomerRequest[]=[];
  Request:CustomerRequest = new CustomerRequest();
  constructor(private service:CustomerRequestService,
    private confirmationService:ConfirmationService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getAllrequests(1);
  }
  getAllrequests(index: number){
    this.service.GetAllWithPaging(index).subscribe(resp=>{
      this.Requests = resp.data.items;
      this.Request = this.Requests[0]
    })
  }
  getById(id:string){
    this.service.GetById(id).subscribe(resp=>{
      this.Request = resp.data;
    })
  }
  confirm(event: any, id: string) {
    this.confirmationService.confirm({
      target: event.target,
      message: "Are you sure that you want to proceed?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.service.Delete(id).subscribe(resp => {
          this.getAllrequests(1);
          if (resp.succeeded === true) {
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: "You have deleted"
            });
          }
          else {
            this.messageService.add({
              severity: "error",
              summary: "Rejected",
              detail: "You have rejected"
            });
          }
        })
      },
      reject: () => {

      }
    });
  }
}
