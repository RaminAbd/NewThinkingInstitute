import { Component, Input, OnInit } from '@angular/core';
import { NewsService } from '../../../Services/news.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-short-news',
  templateUrl: './short-news.component.html',
  styleUrls: ['./short-news.component.css']
})
export class ShortNewsComponent implements OnInit {
  shortNews: any[] = []
  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.getAll();
  }
  getAll() {
    this.newsService.GetAll().subscribe(resp => {
      var filteredShortNews = resp.data.sort((a:any,b:any)=>{
        return b.createdAt - a.createdAt;
      });
      for (let i = 0; i < 3; i++) {
        this.shortNews.push(filteredShortNews[i])
      }
    })
  }
}
