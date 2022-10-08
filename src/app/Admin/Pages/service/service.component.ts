import { Component, OnInit } from '@angular/core';
import { ServiceModel } from 'src/app/Models/Service.model';
import { TrainingsService } from '../../../Services/trainings.service';
import { FileService } from '../../../Services/file.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { ServiceService } from '../../../Services/service.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class AdminServiceComponent implements OnInit {

  Services:ServiceModel[] = [];
  constructor(
    private service: ServiceService,
    private fileService: FileService,
    private router: Router,
    private confirmationService:ConfirmationService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
  ) { }


  ngOnInit(): void {
    this.getAll()
    this.primengConfig.ripple = true;
  }
  getAll() {
    this.service.GetAll().subscribe(resp => {
      this.Services = resp.data
    })
  }
  CreateBlog() {
    this.router.navigate(['admin/services', "create"])
  }
  editBlog(id: string) {
    this.router.navigate(['admin/services', id])
  }
  confirm(event: any, id:string) {
    this.confirmationService.confirm({
      target: event.target,
      message: "Are you sure that you want to proceed?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        console.log(id);
        // console.log(this.deleteBlog(id));
        this.service.Delete(id).subscribe(resp => {
          this.getAll();
          if(resp.succeeded === true){
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: "You have deleted"
            });
          }
          else{
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
