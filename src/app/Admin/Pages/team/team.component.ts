import { Component, OnInit } from '@angular/core';
import { TeamItem } from '../../../Models/TeamItem';
import { TeamService } from '../../../Services/team.service';
import { FileService } from '../../../Services/file.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class AdminTeamComponent implements OnInit {

  TeamItems:TeamItem[] = [];
  constructor(
    private service: TeamService,
    private router: Router,
    private confirmationService:ConfirmationService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private translate: TranslateService
  ) { }


  ngOnInit(): void {
    this.getAll()
    this.primengConfig.ripple = true;
  }
  getAll() {
    this.service.GetAll(this.translate.currentLang).subscribe(resp => {
      this.TeamItems = resp.data
    })
  }
  CreateItem() {
    this.router.navigate(['admin/team', "create"])
  }
  editItem(id: string) {
    this.router.navigate(['admin/team', id])
  }
  confirm(event: any, id:string) {
    this.confirmationService.confirm({
      target: event.target,
      message: "Are you sure that you want to proceed?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        console.log(id);
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
