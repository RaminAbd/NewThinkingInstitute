import { Component, Input, OnInit } from '@angular/core';
import { NewsService } from '../../../Services/news.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-short-news',
  templateUrl: './short-news.component.html',
  styleUrls: ['./short-news.component.css']
})
export class ShortNewsComponent implements OnInit {
  @Input() shortNews:any[]=[];
  constructor(private newsService: NewsService) { }

  ngOnInit(): void {

  }

}
