import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../Services/news.service';
import { BlogService } from '../../Services/blog.service';
import { News } from '../../Models/News';
import { Blog } from '../../Models/Blog';
import { CustomerRequest } from '../../Models/CustomerRequest';
import { CustomerRequestService } from '../../Services/customer-request.service';
import { Platform } from '@angular/cdk/platform';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  shortBlogs:any[]=[];
  shortNews:any[]=[];
  slideNews:any[]=[];
  responsive:boolean = false;
  lang: string;
  isPhoneSize = false
  CustomerRequest:CustomerRequest = new CustomerRequest();
  constructor(private newsService: NewsService, private blogsService: BlogService, private customerService:CustomerRequestService, private translate: TranslateService) {
      console.log(window.screen.width, "jdslnvklsdnvsdlkvn");
    if(window.screen.width <  800){
      this.responsive = true;
    }else{
      this.responsive = false;
    }
    if(window.screen.width < 540){
      this.isPhoneSize = true;
      this.responsive = false;
      console.log(this.isPhoneSize);
      console.log(this.responsive);

    }
    else{
      this.isPhoneSize= false
    }
    this.shortBlogs = []
      this.shortNews = []
    this.lang = this.translate.currentLang;
      this.translate.onLangChange.subscribe((lang) => {
        // console.log(lang);
        // this.getAllNews(lang.lang)
        // this.getAllBlogs(lang.lang);
        this.lang = lang.lang
      });
   }

  ngOnInit(): void {
    this.getAllNews(this.lang)
    this.getAllBlogs(this.lang);

  }

  getAllNews(lang:string){
    this.shortNews = [];
    this.slideNews = [];
    this.newsService.GetAll(lang).subscribe(resp=>{
      var slide = resp.data.filter((word:any) => word.isForSlider === true);
      var filteredShortNews = resp.data.sort((a:any,b:any)=>{
        return b.createdAt - a.createdAt;
      });
      for(let i = 0;i < 3; i++){
        if(slide[i] !== undefined ){
          this.slideNews.push(slide[i]);
        }
        if(filteredShortNews[i] !== undefined){
          this.shortNews.push(filteredShortNews[i]);
        }

      }
      console.log(this.slideNews);

    })
  }

  getAllBlogs(lang : string){
    this.shortBlogs = []
    this.blogsService.GetAll(lang).subscribe(resp=>{
      console.log(resp);
      var filtered = resp.data.sort((a:any,b:any)=>{
        return b.createdAt - a.createdAt;
      });
      for(let i = 0;i < 3; i++){
        this.shortBlogs.push(filtered[i]);
      }
      console.log(this.shortBlogs);

    })
  }
  clearInputs(){
    this.CustomerRequest.fullName = '';
    this.CustomerRequest.email = '';
  }
  requestMessage={
    'message':'',
    'color':''
  };
  showCustomerErrorMessage = false;
  Send(){
    if(this.CustomerRequest.comment==='' || this.CustomerRequest.comment === undefined || this.CustomerRequest.comment === null){
      this.showCustomerErrorMessage = true;
      console.log("jdsbv");

    }
    else{
      if(!this.CustomerRequest.isAnonymous){
        if((this.CustomerRequest.fullName ==='' || this.CustomerRequest.fullName === undefined || this.CustomerRequest.fullName === null)
        || (this.CustomerRequest.email ==='' || this.CustomerRequest.email === undefined || this.CustomerRequest.email === null)){
          this.showCustomerErrorMessage = true;
        }
        else{
          this.showCustomerErrorMessage = false;
        }
      }
    }

    if(!this.showCustomerErrorMessage){
      console.log(this.CustomerRequest);
      this.customerService.CreateRequest(this.CustomerRequest).subscribe(resp=>{
        console.log(resp);
        if(resp.succeeded){
          this.requestMessage.message = "Message sent successfully";
          this.requestMessage.color = "green";

          setTimeout(() => {
            this.CustomerRequest = new CustomerRequest();
            this.requestMessage = {
              'message':'',
              'color':''
            };
          }, 4000)

        }
        else{
          this.requestMessage.message = "message not delivered";
          this.requestMessage.color = "red";
        }
      })
    }

  }
}
