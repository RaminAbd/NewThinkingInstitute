import { Component, Input, OnInit } from '@angular/core';
import { NewsService } from '../../../Services/news.service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-short-news',
  templateUrl: './short-news.component.html',
  styleUrls: ['./short-news.component.css']
})
export class ShortNewsComponent implements OnInit {
  shortNews: any[] = []
  responsive:boolean = false;
  lang:any;
  constructor(private newsService: NewsService, private translate: TranslateService) {
    if(window.screen.width <  800){
      this.responsive = true;
    }else{
      this.responsive = false;
    }
    this.translate.onLangChange.subscribe((lang) => {
     this.lang = lang.lang;
    });
   }

  ngOnInit(): void {
    this.getAll(this.translate.currentLang)
  }
  getAll(lang:string) {
    this.shortNews = []
    this.newsService.GetAll(lang).subscribe(resp => {
      var filteredShortNews = resp.data.sort((a:any,b:any)=>{
        return b.createdAt - a.createdAt;
      });
      for (let i = 0; i < 3; i++) {
        this.shortNews.push(filteredShortNews[i])
      }
    })
  }
}
