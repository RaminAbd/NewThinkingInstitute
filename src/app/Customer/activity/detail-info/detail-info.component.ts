import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../../Services/service.service';
import { CoursesService } from '../../../Services/courses.service';
import { TrainingsService } from '../../../Services/trainings.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-detail-info',
  templateUrl: './detail-info.component.html',
  styleUrls: ['./detail-info.component.css']
})
export class DetailInfoComponent implements OnInit {
  id: string;
  type: string;
  Item: any;
  lang:string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceService: ServiceService,
    private coursesService: CoursesService,
    private trainingsService: TrainingsService,
    private translate: TranslateService
  ) {
    this.lang = this.translate.currentLang;
    this.translate.onLangChange.subscribe((lang) => {
      if(this.lang !== lang.lang){
        this.lang = lang.lang
        this.switchType()
      }
     });
    this.id = this.route.snapshot.paramMap.get('id') as string;
    this.type = this.route.snapshot.paramMap.get('type') as string;
  }
  getService(id:string, lang:string){
    this.serviceService.GetById(id, lang).subscribe(resp => {
      this.Item = resp.data;
    })
  }
  getCourse(id:string, lang:string) {
    this.coursesService.GetById(id, lang).subscribe(resp => {
      this.Item = resp.data;
    })
  }
  getTraining(id:string, lang:string) {
    this.trainingsService.GetById(id, lang).subscribe(resp => {
      this.Item = resp.data;
    })
  }
  ngOnInit(): void {
    console.log(this.type);
    this.switchType();
  }
  switchType(){
    switch (this.type) {
      case 'service': {
        this.getService(this.id, this.lang);
        break;
      }
      case 'courses': {
        this.getCourse(this.id, this.lang);
        break;
      }
      case 'trainings-and-seminars': {
        this.getTraining(this.id, this.lang);
        break;
      }
      default: {
        alert('Something went wrong');
        this.router.navigate(['/main']);
        break;
      }
    }
  }
}
