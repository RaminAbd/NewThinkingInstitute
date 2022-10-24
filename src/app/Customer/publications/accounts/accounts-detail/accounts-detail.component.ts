import { Component, OnInit, OnDestroy } from '@angular/core';
import { Accounts } from '../../../../Models/Accounts';
import { ActivatedRoute } from '@angular/router';
import { AccountsService } from '../../../../Services/accounts.service';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-accounts-detail',
  templateUrl: './accounts-detail.component.html',
  styleUrls: ['./accounts-detail.component.css']
})
export class AccountsDetailComponent implements OnInit, OnDestroy {

  id: string;
  AccountsItem: Accounts = new Accounts()
  detailUrl: any;
  constructor(private route: ActivatedRoute, private service: AccountsService, private sanitizer: DomSanitizer, private translate: TranslateService) { }
  text: string = "new nesa nesa \n <br> /n nesa";
  subscription: any
  lang: any;
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    this.GetNewsById(this.id, this.translate.currentLang)
    this.detailUrl = window.location.origin + "/news/" + this.id;
    this.subscription = this.translate.onLangChange.subscribe((lang) => {
      if (this.lang !== lang.lang) {
        this.lang = lang.lang
        this.GetNewsById(this.id, lang.lang)
      }
    });
  }

  GetNewsById(id: string, lang: string) {
    this.service.GetNewsById(id, lang).subscribe(resp => {
      this.AccountsItem = resp.data;
    })
  }
  getLine(e: any) {
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
