import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../../Services/news.service';
import { News } from '../../../Models/News';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {
  id:string;
  NewsItem:News = new News()
  detailUrl:any;
  constructor(private route: ActivatedRoute, private newsService: NewsService,private sanitizer: DomSanitizer,) { }
  text:string = "new nesa nesa \n <br> /n nesa";
  ngOnInit(): void {
    console.log(window.location.origin);

    this.id = this.route.snapshot.paramMap.get('id') as string;
    console.log(this.id);
    this.detailUrl = window.location.origin + "/news-detail/" + this.id;
    console.log(this.detailUrl);

    this.GetNewsById(this.id)
  }
  TrustUrl(url: any) {
    //https://www.youtube.com/embed/AK-cb91BuAw
    var customUrl = `https://www.youtube.com/embed/` + url.split('/')[3];
    return this.sanitizer.bypassSecurityTrustResourceUrl(customUrl);
  }
  GetNewsById(id:string){
    this.newsService.GetNewsById(id).subscribe(resp =>{
      console.log(resp.data);
      resp.data.videoURL = this.TrustUrl(resp.data.videoURL);
      this.NewsItem = resp.data;
    })
  }
  getLine(e:any){
    console.log(e.target.value);
  }
}
