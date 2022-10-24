import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NewsService } from '../../../Services/news.service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ShortsService } from '../../../Services/shorts.service';

@Component({
  selector: 'app-short-news',
  templateUrl: './short-news.component.html',
  styleUrls: ['./short-news.component.css']
})
export class ShortNewsComponent implements OnInit, OnDestroy {
  @Input() shortNews: any;
  responsive: boolean = false;
  lang: any;
  subscription: any

  constructor(private newsService: NewsService, private translate: TranslateService, private shortService: ShortsService) {
    if (window.screen.width < 800) {
      this.responsive = true;
    } else {
      this.responsive = false;
    }
    if (this.shortNews) {
      this.getShorts(this.translate.currentLang)
      this.subscription = this.translate.onLangChange.subscribe((lang) => {
        if (this.lang !== lang.lang) {
          this.lang = lang.lang
          this.getShorts(lang.lang)
        }
      });
    }

  }

  ngOnInit(): void {
    // this.getAll(this.translate.currentLang)
  }
  getShorts(lang: string) {
    this.shortService.GetShorts(lang).subscribe(resp => {
      this.shortNews = [];
      this.shortNews = resp.data.news;
    })
  }
  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
