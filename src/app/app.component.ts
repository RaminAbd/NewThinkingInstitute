import { Component } from '@angular/core';
import {  TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor( public translate: TranslateService,){
    this.translate.addLangs(['az-Aze','ka-Geo', 'en-Us']);
    const langExists: boolean = !!localStorage.getItem('systemLanguage');

    if (!langExists) {
      translate.setDefaultLang('az-Aze');
      localStorage.setItem('systemLanguage', 'az-Aze');
      translate.use('az-Aze');
    } else {
      const value: string = localStorage.getItem('systemLanguage') as string;
      translate.setDefaultLang(value);
      translate.use(value);
    }
  }

}
