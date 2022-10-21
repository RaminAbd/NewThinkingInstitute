import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  selectedLanguageForUI:string = "";
  showLang:boolean = false;
  active:boolean = false;

  constructor( public translate: TranslateService){
    this.getLanguageIdentifier(this.translate.currentLang)
  }
  getLanguageIdentifier(lang:string){
    switch(lang){
      case 'az-Aze': {
        this.selectedLanguageForUI = "AZ";
        break;
      }
      case 'ka-Geo': {
        this.selectedLanguageForUI = "KA";
        break;
      }
      case 'en-Us': {
        this.selectedLanguageForUI = "EN";
        break;
      }
      default: {
        this.selectedLanguageForUI = "AZ";
        break;
      }
    }
  }

  changeLanguage(value: string) {
    this.getLanguageIdentifier(value)
    this.showLang = false;
    localStorage.setItem('systemLanguage', value);
    this.translate.use(value);
    // window.location.reload();
  }

  ngOnInit(): void {
    var links = document.querySelectorAll('ul li ul li');
    console.log(links);
    for(let i = 0;i<links.length;i++){
      links[i].addEventListener('click',()=>{
        this.active = false
      })
    }
  }

}
