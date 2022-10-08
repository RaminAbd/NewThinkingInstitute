import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../../Services/projects.service';
import { Project } from '../../../Models/Project';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class AdminProjectsComponent implements OnInit {
  Items:Project[] = [];
  constructor(private service: ProjectsService,
    private router:Router,
    private confirmationService:ConfirmationService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.GetAll()
  }
  GetAll(){
    this.service.GetAll().subscribe(resp=>{
      this.Items = resp.data;
    })
  }
  editItem(id: string) {
    this.router.navigate(['admin/projects', id])
  }
  CreateItem() {
    this.router.navigate(['admin/projects', "create"]);
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
