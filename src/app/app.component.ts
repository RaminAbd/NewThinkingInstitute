import { Component } from '@angular/core';
import {  TranslateService } from '@ngx-translate/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isAdmin: boolean = false;
  constructor( public translate: TranslateService,private router:Router){
    this.translate.addLangs(['az-Aze','ka-Geo', 'en-Us']);
    const langExists: boolean = !!localStorage.getItem('systemLanguage');
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        if((e.url).split('/')[1]==='admin'){
          this.isAdmin = true;
        }
        else{
          this.isAdmin = false
        }
      }
    });
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
