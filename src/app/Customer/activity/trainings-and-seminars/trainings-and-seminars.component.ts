import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingsService } from '../../../Services/trainings.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-trainings-and-seminars',
  templateUrl: './trainings-and-seminars.component.html',
  styleUrls: ['./trainings-and-seminars.component.css']
})
export class TrainingsAndSeminarsComponent implements OnInit, OnDestroy {

  subscription: any
  Services: any[] = [];
  constructor(private service: TrainingsService, private translate: TranslateService) { }
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
