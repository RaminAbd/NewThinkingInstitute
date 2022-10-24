import { Component, OnInit, OnDestroy } from '@angular/core';
import { CoursesService } from 'src/app/Services/courses.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit, OnDestroy {

  subscription: any
  Services: any[] = [];
  constructor(private service: CoursesService, private translate: TranslateService) { }
  ngOnInit(): void {
    this.getAll(this.translate.currentLang)
    this.subscription = this.translate.onLangChange.subscribe((lang) => {
      this.getAll(lang.lang)
    });
  }
  getAll(lang: string) {
    this.service.GetAll(lang).subscribe(resp => {
      this.Services = resp.data;
    })
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
