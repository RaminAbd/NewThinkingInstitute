import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../../Services/news.service';
import { News } from '../../../Models/News';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {
  id:string;
  NewsItem:News = new News()
  detailUrl:any;
  constructor(private route: ActivatedRoute, private newsService: NewsService,private sanitizer: DomSanitizer,private translate: TranslateService) { }
  text:string = "new nesa nesa \n <br> /n nesa";
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    this.detailUrl = window.location.origin + "/news-detail/" + this.id;
    this.GetNewsById(this.id, this.translate.currentLang)
    this.translate.onLangChange.subscribe((lang) => {
      this.GetNewsById(this.id, lang.lang)
    });

  }
  TrustUrl(url: any) {
    var customUrl = `https://www.youtube.com/embed/` + url.split('/')[3];
    return this.sanitizer.bypassSecurityTrustResourceUrl(customUrl);
  }
  GetNewsById(id:string, lang:string){
    this.newsService.GetNewsById(id, lang).subscribe(resp =>{
      console.log(resp);
      if(resp.data.videoURL !==null && resp.data.videoURL !==undefined && resp.data.videoURL !==''){
        resp.data.videoURL = this.TrustUrl(resp.data.videoURL);
      }

      this.NewsItem = resp.data;
    })
  }
  getLine(e:any){
    console.log(e.target.value);
  }
}
