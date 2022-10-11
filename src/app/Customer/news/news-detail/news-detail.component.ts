import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../../Services/news.service';
import { News } from '../../../Models/News';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {
  id:string;
  NewsItem:News = new News()
  detailUrl:any;
  constructor(private route: ActivatedRoute, private newsService: NewsService) { }
  text:string = "new nesa nesa \n <br> /n nesa";
  ngOnInit(): void {
    console.log(window.location.origin);

    this.id = this.route.snapshot.paramMap.get('id') as string;
    console.log(this.id);
    this.detailUrl = window.location.origin + "/news-detail/" + this.id;
    console.log(this.detailUrl);

    this.GetNewsdById(this.id)
  }
  GetNewsdById(id:string){
    this.newsService.GetNewsdById(id).subscribe(resp =>{
      this.NewsItem = resp.data;
      console.log(resp.data);

    })
  }
  getLine(e:any){
    console.log(e.target.value);
  }
}
