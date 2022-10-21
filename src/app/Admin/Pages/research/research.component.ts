import { Component, OnInit } from '@angular/core';
import { ResearchService } from '../../../Services/research.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { Research } from '../../../Models/Research';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})
export class AdminResearchComponent implements OnInit {
  Items:Research[] = [];
  constructor(private service: ResearchService,
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
        console.log(resp.data);

        this.Items = resp.data;
      })
    }
    editItem(id: string) {
      this.router.navigate(['admin/research', id])
    }
    CreateItem() {
      this.router.navigate(['admin/research', "create"]);
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
