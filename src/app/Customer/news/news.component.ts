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
    this.getAll()
    this.GetAllWithPaging(1);
  }
  getAll(){
    this.newsService.GetAll().subscribe(resp=>{
      console.log(resp.data);
      this.News = resp.data;
    })
  }
  GetAllWithPaging(index:number){
    this.newsService.GetAllWithPaging(index).subscribe(resp=>{
      console.log(resp);
      this.Response = resp.data;
    })
  }
}
