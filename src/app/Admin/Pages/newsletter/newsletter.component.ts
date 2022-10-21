import { Component, OnInit } from '@angular/core';
import { NewsletterService } from '../../../Services/newsletter.service';
import { NewsLetter } from '../../../Models/Newsletter';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class AdminNewsletterComponent implements OnInit {

  Items:NewsLetter[] = [];
  constructor(private service: NewsletterService,
    private router:Router,
    private confirmationService:ConfirmationService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.GetAll()
  }
  GetAll(){
    this.service.GetAll('ka-Geo').subscribe(resp=>{
      this.Items = resp.data;
    })
  }
  editItem(id: string) {
    this.router.navigate(['admin/newsletter', id])
  }
  CreateItem() {
    this.router.navigate(['admin/newsletter', "create"]);
  }

  confirm(event: any, id: string) {
    this.confirmationService.confirm({
      target: event.target,
      message: "Are you sure that you want to proceed?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.service.Delete(id).subscribe(resp => {
          this.GetAll();
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
