import { Component, OnInit } from '@angular/core';
import { StatusService } from '../../../Services/status.service';
import { ProjectStatus } from '../../../Models/ProjectStatus';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { CreateStatusComponent } from './create-status/create-status.component';

@Component({
  selector: 'app-statuses',
  templateUrl: './statuses.component.html',
  styleUrls: ['./statuses.component.css']
})
export class StatusesComponent implements OnInit {
  Statuses:ProjectStatus[] = [];
  StatusForm:ProjectStatus = new ProjectStatus();
  constructor(private service:StatusService,
    private router:Router,
    private confirmationService:ConfirmationService,
    private dialog: MatDialog,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.GetStatuses()
  }
  GetStatuses(){
    this.service.GetAll().subscribe(resp=>{
      this.Statuses = resp.data;
    })
  }

  editItem(action:string,id: string) {
    this.openDialog(action, id)
  }

  CreateItem(action:string) {
    this.openDialog(action)
  }
  openDialog(action:string, id?:string) {
    const dialogRef = this.dialog.open(CreateStatusComponent, {
      height: '270px',
      width: '550px',
      data: { action: action, id: id}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.GetStatuses();
      document.getElementsByTagName('body')[0].classList.remove('block');
    });
  }
  confirm(event: any, id: string) {
    this.confirmationService.confirm({
      target: event.target,
      message: "Are you sure that you want to proceed?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.service.Delete(id).subscribe(resp => {
          this.GetStatuses();
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
