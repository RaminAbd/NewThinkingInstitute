import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavigationEnd, Router } from '@angular/router';
import { Carousel } from 'primeng/carousel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isAdmin: boolean = false;
  isLoginPage: boolean = false
  constructor(public translate: TranslateService, private router: Router) {
    this.translate.addLangs(['az-Aze', 'ka-Geo', 'en-Us']);
    const langExists: boolean = !!localStorage.getItem('systemLanguage');
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        if ((e.url).split('/')[1] === 'login') {
          this.isLoginPage = true;
        }
        else {
          if ((e.url).split('/')[1] === 'admin') {
            this.isAdmin = true;
          }
          else {
            this.isAdmin = false
          }
          this.isLoginPage = false
        }

      }
    });
    if (!langExists) {
      translate.setDefaultLang('ka-Geo');
      localStorage.setItem('systemLanguage', 'ka-Geo');
      translate.use('ka-Geo');
    } else {
      const value: string = localStorage.getItem('systemLanguage') as string;
      translate.setDefaultLang(value);
      translate.use(value);
    }
  }

}
