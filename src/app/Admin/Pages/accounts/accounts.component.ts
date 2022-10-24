import { Component, OnInit } from '@angular/core';
import { FileService } from '../../../Services/file.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { AccountsService } from '../../../Services/accounts.service';
import { Accounts } from '../../../Models/Accounts';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AdminAccountsComponent implements OnInit {

  Accounts: Accounts[] = []
  constructor( private service:AccountsService,
  private fileService: FileService,
  private router: Router,
  private confirmationService:ConfirmationService,
  private messageService: MessageService,
  private primengConfig: PrimeNGConfig,
  private route:ActivatedRoute,
  private confirmPopupModule:ConfirmPopupModule) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getAll()

  }
  getAll() {
    this.service.GetAll().subscribe(resp => {
      this.Accounts = resp.data;
    })
  }
  editItem(id: string) {
    this.router.navigate(['admin/accounts', id])
  }
  CreateItem() {
    this.router.navigate(['admin/accounts', "create"])
  }
  confirm(event: any, id: string) {
    this.confirmationService.confirm({
      target: event.target,
      message: "Are you sure that you want to proceed?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.service.Delete(id).subscribe(resp => {
          this.getAll();
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
