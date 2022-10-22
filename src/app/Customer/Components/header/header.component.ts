import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SearchService } from '../../../Services/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  selectedLanguageForUI: string = "";
  showLang: boolean = false;
  active: boolean = false;
  languages: any[] = [
    {
      'key': 'az-Aze',
      'value': 'AZ',
      'selected': false
    },
    {
      'key': 'ka-Geo',
      'value': 'KA',
      'selected': false
    },
    {
      'key': 'en-Us',
      'value': 'EN',
      'selected': false
    }]
  constructor(public translate: TranslateService, private searchService: SearchService, private router: Router) {
    this.getLanguageIdentifier(this.translate.currentLang)
    console.log(window.screen.width);

    if (window.screen.width < 800) {
      this.responsive = true;
      console.log("bir");

    } else {
      console.log("iki");
      this.responsive = false;
    }
  }
  getLanguageIdentifier(lang: string) {
    switch (lang) {
      case 'az-Aze': {
        this.selectedLanguageForUI = "AZ";
        this.languages[0].selected = true;
        this.languages[1].selected = false;
        this.languages[2].selected = false;
        break;
      }
      case 'ka-Geo': {
        this.languages[0].selected = false;
        this.languages[1].selected = true;
        this.languages[2].selected = false;
        this.selectedLanguageForUI = "KA";
        break;
      }
      case 'en-Us': {
        this.languages[0].selected = false;
        this.languages[1].selected = false;
        this.languages[2].selected = true;
        this.selectedLanguageForUI = "EN";
        break;
      }
      default: {
        this.languages[0].selected = true;
        this.languages[1].selected = false;
        this.languages[2].selected = false;
        this.selectedLanguageForUI = "AZ";
        break;
      }
    }
  }
  openMenu() {
    this.active = !this.active;
    if (this.active) {
      document.getElementsByTagName('body')[0].classList.add('block');
    }
    else {
      document.getElementsByTagName('body')[0].classList.remove('block');
    }
  }
  changeLanguage(value: string) {
    this.getLanguageIdentifier(value)
    this.showLang = false;
    localStorage.setItem('systemLanguage', value);
    this.translate.use(value);
    // window.location.reload();
  }
  responsive: boolean = false;
  ngOnInit(): void {
    var links = document.querySelectorAll('ul li ul li');
    console.log(links);
    for (let i = 0; i < links.length; i++) {
      links[i].addEventListener('click', () => {
        this.active = false
        document.getElementsByTagName('body')[0].classList.remove('block');
      })
    }

  }
  activerespMenu() {
    this.active = false;
    document.getElementsByTagName('body')[0].classList.remove('block');
  }
  showSearch: boolean = false;
  openSearch() {
    this.showSearch = !this.showSearch
    if (this.showSearch) {
      document.getElementsByTagName('body')[0].classList.add('block');
    }
    else {
      document.getElementsByTagName('body')[0].classList.remove('block');
    }


  }
  searchText: string = '';
  search() {
    console.log(this.searchText);
    this.router.navigate(['search-result', this.searchText]).then(() => {
      window.location.reload();
    });
    this.showSearch = false;
  }
}
