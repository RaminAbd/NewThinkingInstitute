import { Component, OnInit, OnChanges } from '@angular/core';
import { NewsService } from '../../Services/news.service';
import { BlogService } from '../../Services/blog.service';
import { News } from '../../Models/News';
import { Blog } from '../../Models/Blog';
import { CustomerRequest } from '../../Models/CustomerRequest';
import { CustomerRequestService } from '../../Services/customer-request.service';
import { Platform } from '@angular/cdk/platform';
import { TranslateService } from '@ngx-translate/core';
import { ShortsService } from 'src/app/Services/shorts.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnChanges {
  shortBlogs: any[] = [];
  shortNews: any[] = [];
  slideNews: any[] = [];
  responsive: boolean = false;
  lang: string;
  isPhoneSize = false
  CustomerRequest: CustomerRequest = new CustomerRequest();
  constructor(private newsService: NewsService,
    private blogsService: BlogService,
    private customerService: CustomerRequestService,
    private translate: TranslateService,
    private shortService: ShortsService
  ) {
    if (window.screen.width < 800) {
      this.responsive = true;
    } else {
      this.responsive = false;
    }
    if (window.screen.width < 540) {
      this.isPhoneSize = true;
      this.responsive = false;
    }
    else {
      this.isPhoneSize = false
    }
    this.shortBlogs = []
    this.shortNews = []
    this.lang = this.translate.currentLang;
    this.translate.onLangChange.subscribe((lang) => {
      if (this.lang !== lang.lang) {
        this.lang = lang.lang
        this.getShorts(this.lang)
      }

    });
  }
  getShorts(lang: string) {
    this.shortService.GetShorts(lang).subscribe(resp => {
      this.slideNews = [];
      this.shortNews = [];
      this.shortBlogs = [];
      this.slideNews = resp.data.slider;
      this.shortNews = resp.data.news;
      this.shortBlogs = resp.data.blogs;
      console.log(this.shortBlogs);

    })
  }
  ngOnInit(): void {
    this.getShorts(this.lang)
  }
  ngOnChanges() {
  }

  clearInputs() {
    this.CustomerRequest.fullName = '';
    this.CustomerRequest.email = '';
  }
  requestMessage = {
    'message': '',
    'color': ''
  };
  showCustomerErrorMessage = false;
  Send() {
    if (this.CustomerRequest.comment === '' || this.CustomerRequest.comment === undefined || this.CustomerRequest.comment === null) {
      this.showCustomerErrorMessage = true;
    }
    else {
      if (!this.CustomerRequest.isAnonymous) {
        if ((this.CustomerRequest.fullName === '' || this.CustomerRequest.fullName === undefined || this.CustomerRequest.fullName === null)
          || (this.CustomerRequest.email === '' || this.CustomerRequest.email === undefined || this.CustomerRequest.email === null)) {
          this.showCustomerErrorMessage = true;
        }
        else {
          this.showCustomerErrorMessage = false;
        }
      }
    }

    if (!this.showCustomerErrorMessage) {
      this.customerService.CreateRequest(this.CustomerRequest).subscribe(resp => {
        if (resp.succeeded) {
          this.requestMessage.message = "Message sent successfully";
          this.requestMessage.color = "green";
          setTimeout(() => {
            this.CustomerRequest = new CustomerRequest();
            this.requestMessage = {
              'message': '',
              'color': ''
            };
          }, 4000)

        }
        else {
          this.requestMessage.message = "message not delivered";
          this.requestMessage.color = "red";
        }
      })
    }

  }
}
