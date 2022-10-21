import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/Services/blog.service';
import { Blog } from '../../../../Models/Blog';
import { TranslateService } from '@ngx-translate/core';

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
  constructor(private route: ActivatedRoute, private blogsService: BlogService, private translate: TranslateService) {this.id = this.route.snapshot.paramMap.get('id') as string; }

  ngOnInit(): void {
    this.detailUrl = window.location.origin + "/news-detail/" + this.id;
    this.getById(this.id, this.translate.currentLang)
    this.translate.onLangChange.subscribe((lang) => {
      // this.lang = lang.lang;
      this.getById(this.id, lang.lang)
    });
    this.getAllBlogs(this.translate.currentLang)
  }
  getById(id: string, lang: string){
    this.blogsService.GetBlogById(id, lang).subscribe(resp=>{
      this.Item = resp.data;
    })
  }

  getAllBlogs(lang : string){
    this.blogsService.GetAll(lang).subscribe(resp=>{
      console.log(resp);
      var filtered = resp.data.sort((a:any,b:any)=>{
        return b.createdAt - a.createdAt;
      });
      for(let i = 0;i < 3; i++){
        this.shortBlogs.push(filtered[i]);
      }
      console.log(this.shortBlogs);

    })
  }
}
