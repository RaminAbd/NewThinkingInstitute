import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectsService } from '../../../Services/projects.service';
import { NewsPagingResponse } from '../../../Models/NewsPagingResponse.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit , OnDestroy{
  Response:NewsPagingResponse = new NewsPagingResponse();
  constructor(private service:ProjectsService, private translate:TranslateService) { }
  Projects:any[]=[]
  subscription:any
  lang: string;
  ngOnInit(): void {
    this.lang = this.translate.currentLang;
    this.GetAllWithPaging(1, this.translate.currentLang)
    this.subscription =  this.translate.onLangChange.subscribe((lang) => {
      if(this.lang !== lang.lang){
        this.lang = lang.lang
        this.GetAllWithPaging(1, lang.lang)
      }
     });

  }
  GetAllWithPaging(index:any, lang:string){
    this.service.GetAllWithPaging(index, lang).subscribe(resp=>{
      this.Response = resp.data;
      this.Projects = resp.data.items;
      console.log(resp.data);
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    })
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
