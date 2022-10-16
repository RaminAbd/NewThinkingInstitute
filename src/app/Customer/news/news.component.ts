import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../Services/news.service';
import { News } from '../../Models/News';
import { NewsPagingResponse } from '../../Models/NewsPagingResponse.model';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  index:number = 1;
  Response:NewsPagingResponse = new NewsPagingResponse();
  constructor(private newsService: NewsService) { }
  News:any[]=[]
  ngOnInit(): void {
    this.GetAllWithPaging(1);
  }
  GetAllWithPaging(index:any){
    this.newsService.GetAllWithPaging(index).subscribe(resp=>{
      this.Response = resp.data;
      this.News = resp.data.items;
      console.log(resp.data.items);

    })
  }
}
