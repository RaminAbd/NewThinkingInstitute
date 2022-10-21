import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/Services/courses.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  Services:any[]=[];
  constructor(private service:CoursesService, private translate:TranslateService) { }
  ngOnInit(): void {
    this.getAll(this.translate.currentLang)
    this.translate.onLangChange.subscribe((lang) => {
      this.getAll(lang.lang)
     });
  }
  getAll(lang:string){
    this.service.GetAll(lang).subscribe(resp=>{
      this.Services = resp.data;
      console.log(resp.data);
    })
  }
}
