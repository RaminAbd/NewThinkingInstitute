import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/Services/blog.service';
import { Blog } from '../../../../Models/Blog';
import { TranslateService } from '@ngx-translate/core';
import { ShortsService } from '../../../../Services/shorts.service';

@Component({
  selector: 'app-blogs-detail',
  templateUrl: './blogs-detail.component.html',
  styleUrls: ['./blogs-detail.component.css']
})
export class BlogsDetailComponent implements OnInit {
  id:string;
  Item:Blog = new Blog()
  detailUrl:any;
  shortBlogs:any[]=[]
  constructor(
    private route: ActivatedRoute,
    private blogsService: BlogService,
    private translate: TranslateService,
    private shortService: ShortsService
    ) {this.id = this.route.snapshot.paramMap.get('id') as string; }
  lang:any;
  ngOnInit(): void {
    this.detailUrl = window.location.origin + "/news/" + this.id;
    this.getById(this.id, this.translate.currentLang)
    this.translate.onLangChange.subscribe((lang) => {
      if(this.lang !== lang.lang){
        this.lang = lang.lang;
        this.getById(this.id, lang.lang)
        this.getShorts(lang.lang)
      }

    });
    this.getShorts(this.translate.currentLang)
  }
  getById(id: string, lang: string){
    this.blogsService.GetBlogById(id, lang).subscribe(resp=>{
      this.Item = resp.data;
    })
  }


  getShorts(lang: string){
    this.shortService.GetShorts(lang).subscribe(resp => {
      this.shortBlogs = [];
      this.shortBlogs = resp.data.blogs;
    })
  }
}
