import { Component, OnInit } from '@angular/core';
import { NewsPagingResponse } from 'src/app/Models/NewsPagingResponse.model';
import { AccountsPagingResponse } from '../../../Models/AccountsPagingResponse.model';
import { AccountsService } from '../../../Services/accounts.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  lang: string
  index:number = 1;
  Response:AccountsPagingResponse = new NewsPagingResponse();
  constructor(private service: AccountsService, private translate: TranslateService) { }
  News:any[]=[]
  ngOnInit(): void {
    this.GetAllWithPaging(1, this.translate.currentLang);
    this.translate.onLangChange.subscribe((lang) => {
      this.lang = lang.lang;
      this.GetAllWithPaging(1, lang.lang)
    });
  }
  GetAllWithPaging(index:any, lang:string){
    this.service.GetAllWithPaging(index, lang).subscribe(resp=>{
      this.Response = resp.data;
      this.News = resp.data.items;
      console.log(resp.data.items);
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    })
  }
}
