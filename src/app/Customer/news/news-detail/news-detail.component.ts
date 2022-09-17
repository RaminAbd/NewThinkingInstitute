import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {

  constructor() { }
  text:string = "new nesa nesa \n <br> /n nesa";
  ngOnInit(): void {
  }
  getLine(e:any){
    console.log(e.target.value);

  }
}
