import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../Services/news.service';
import { News } from '../../Models/News';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor(private newsService: NewsService) { }
  News:News[]=[]
  ngOnInit(): void {
    this.getAll()
  }
  getAll(){
    this.newsService.GetAll().subscribe(resp=>{
      console.log(resp.data);
      this.News = resp.data;
    })
  }
}
