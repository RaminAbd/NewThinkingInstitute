import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/Models/News';
import { NewsService } from '../../../Services/news.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FileService } from '../../../Services/file.service';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class AdminNewsComponent implements OnInit {
  News: News[] = []
  constructor( private service: NewsService,
  private fileService: FileService,
  private router: Router,
  private confirmationService:ConfirmationService,
  private messageService: MessageService,
  private primengConfig: PrimeNGConfig,
  private route:ActivatedRoute,
  private confirmPopupModule:ConfirmPopupModule, private translate: TranslateService) { }
    lang: string;
  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.lang = this.translate.currentLang;
    this.getAll('ka-Geo')
  }
  getAll(lang:string) {
    this.service.GetAll(lang).subscribe(resp => {
      this.News = resp.data
      console.log(resp.data);
    })
  }
  editItem(id: string) {
    this.router.navigate(['admin/news', id])
  }
  CreateItem() {
    this.router.navigate(['admin/news', "create"])
  }
  confirm(event: any, id: string) {
    this.confirmationService.confirm({
      target: event.target,
      message: "Are you sure that you want to proceed?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.service.Delete(id).subscribe(resp => {
          this.getAll(this.lang);
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
