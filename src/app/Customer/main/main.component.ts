import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../Services/news.service';
import { BlogService } from '../../Services/blog.service';
import { News } from '../../Models/News';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private newsService: NewsService, private blogsService: BlogService) { }
  news = [{
    'header':"შემთხვევითად გენერირებული ტექსტი ეხმარება დიზაინერებს",
    'description':"შემთხვევითად გენერირებული ტექსტი ეხმარება დიზაინერებს და ტიპოგრაფიული ნაწარმის მქმნელებს, რეალურთან მაქსიმალურად შემთხვევითად გენერირებული ტექსტი ეხმარება დიზაინერებს და ტიპოგრაფიული ნაწარმის მქმნელებს, რეალურთან მაქსიმალურად",
    'imageUrl': 'assets/images/banner.png',
    'date': '28 Aug, 2022'
  },
  {
    'header':"შემთხვევითად გენერირებული ტექსტი ეხმარება დიზაინერებს",
    'description':"შემთხვევითად გენერირებული ტექსტი ეხმარება დიზაინერებს და ტიპოგრაფიული ნაწარმის მქმნელებს, რეალურთან მაქსიმალურად შემთხვევითად გენერირებული ტექსტი ეხმარება დიზაინერებს და ტიპოგრაფიული ნაწარმის მქმნელებს, რეალურთან მაქსიმალურად",
    'imageUrl': 'assets/images/banner.png',
    'date': '28 Aug, 2022'
  },
  {
    'header':"შემთხვევითად გენერირებული ტექსტი ეხმარება დიზაინერებს",
    'description':"შემთხვევითად გენერირებული ტექსტი ეხმარება დიზაინერებს და ტიპოგრაფიული ნაწარმის მქმნელებს, რეალურთან მაქსიმალურად შემთხვევითად გენერირებული ტექსტი ეხმარება დიზაინერებს და ტიპოგრაფიული ნაწარმის მქმნელებს, რეალურთან მაქსიმალურად",
    'imageUrl': 'assets/images/banner.png',
    'date': '28 Aug, 2022'
  }]
  responsiveOptions = [
    {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
    },
    {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
    }
];
  slideNews:any = new News();
  ngOnInit(): void {
    this.getAllNews()
  }

  getAllNews(){
    this.newsService.GetAll().subscribe(resp=>{
      console.log(resp.data);
      this.slideNews = resp.data.filter((word:any) => word.isForSlider === true);
      console.log(this.slideNews);

    })
  }
}
