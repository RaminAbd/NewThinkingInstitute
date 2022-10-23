import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../Services/blog.service';
import { BlogsPagingResponse } from '../../../Models/BlogsPagingResponse';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  Blogs:any[]=[];
  lang:string;
  Response:BlogsPagingResponse = new BlogsPagingResponse();
  constructor( private blogsService: BlogService,private translate: TranslateService) { }

  ngOnInit(): void {
    this.GetAllWithPaging(1, this.translate.currentLang)
    this.translate.onLangChange.subscribe((lang) => {
      if(this.lang !== lang.lang){
        this.lang = lang.lang
        this.GetAllWithPaging(1, lang.lang)
      }
    });
  }

  GetAllWithPaging(index:any, lang:string){
    this.blogsService.GetAllWithPaging(index, lang).subscribe(resp=>{
      this.Response = resp.data;
      this.Blogs = resp.data.items;
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    })
  }
}
