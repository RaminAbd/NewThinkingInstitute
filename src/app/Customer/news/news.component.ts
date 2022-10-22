import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../Services/news.service';
import { News } from '../../Models/News';
import { NewsPagingResponse } from '../../Models/NewsPagingResponse.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  index:number = 1;
  lang:string;
  Response:NewsPagingResponse = new NewsPagingResponse();
  constructor(private newsService: NewsService, private translate:TranslateService) {
    this.lang = this.translate.currentLang;
    this.translate.onLangChange.subscribe((lang) => {
      this.GetAllWithPaging(1, lang.lang);
      this.lang = lang.lang;
    });
  }
  News:any[]=[]
  ngOnInit(): void {
    this.GetAllWithPaging(1, this.translate.currentLang)
  }
  GetAllWithPaging(index:any, lang:string){
    this.newsService.GetAllWithPaging(index, lang).subscribe(resp=>{
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
