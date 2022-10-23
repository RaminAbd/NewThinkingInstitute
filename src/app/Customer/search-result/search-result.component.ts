import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../../Services/search.service';
import { TranslateService } from '@ngx-translate/core';
import { SearchResult } from '../../Models/SearchResult';
import { SearchPagingResponse } from '../../Models/SearchPagingResponse';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit, OnChanges {
  searchText: string;
  isPhoneSize: boolean = false;
  result: SearchResult[] = [];
  types: any[] = [];
  lang: any;
  Response: SearchPagingResponse = new SearchPagingResponse();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private searchService: SearchService,
    private translate: TranslateService
    ) {
    this.searchText = this.route.snapshot.paramMap.get('text') as string;
    if (window.screen.width < 540) {
      this.isPhoneSize = true;
    }
    else {
      this.isPhoneSize = false
    }
  }

  ngOnInit(): void {
    this.GetAllWithPaging(1, this.translate.currentLang, this.searchText)
    this.translate.onLangChange.subscribe((lang) => {
      if (this.lang !== lang.lang) {
        this.lang = lang.lang
        this.GetAllWithPaging(1, lang.lang, this.searchText)
      }
    });
    document.getElementsByTagName('body')[0].classList.remove('block');
  }
  GetAllWithPaging(index: number, lang: string, text: string) {

    this.searchService.GetAllWithPaging(index, lang, text).subscribe(resp => {
      this.Response = resp.data;
      this.result = resp.data.items
      this.result.forEach(a => {
        this.types.push(a.type);
      })
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    })
  }
  goToItem(item: any) {
    switch (item.type) {
      case "Research": {
        this.router.navigate(['/publications/studies'])
        break;
      }
      case "Bulletin": {
        this.router.navigate(['/publications/newsletter'])
        break;
      }
      case "News": {
        this.router.navigate(['/news/', item.id])
        break;
      }
      case "Account": {
        this.router.navigate(['/publications/accounts/', item.id])
        break;
      }
      case "Blog": {
        this.router.navigate(['/publications/blogs/', item.id])
        break;
      }
      case "Service": {
        this.router.navigate(['activity/service/detail/', item.id])
        break;
      }
      case "Project": {
        this.router.navigate(['/activity/projects/', item.id])
        break;
      }
      case "Training": {
        this.router.navigate(['/activity/trainings-and-seminars/detail/', item.id])
        break;
      }
      case "Course": {
        this.router.navigate(['/activity/courses/detail/', item.id])
        break;
      }
      default: {
        this.router.navigate(['/main']);
        break;
      }
    }
  }
  ngOnChanges() {
  }
}
