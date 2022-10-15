import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../Services/news.service';
import { BlogService } from '../../Services/blog.service';
import { News } from '../../Models/News';
import { Blog } from '../../Models/Blog';
import { CustomerRequest } from '../../Models/CustomerRequest';
import { CustomerRequestService } from '../../Services/customer-request.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  shortBlogs:any[]=[];
  shortNews:any[]=[];
  slideNews:any[]=[];
  CustomerRequest:CustomerRequest = new CustomerRequest();
  constructor(private newsService: NewsService, private blogsService: BlogService, private customerService:CustomerRequestService) { }

  ngOnInit(): void {
    this.getAllNews()
    this.getAllBlogs();
  }

  getAllNews(){
    this.shortNews = [];
    this.newsService.GetAll().subscribe(resp=>{
      this.slideNews = resp.data.filter((word:any) => word.isForSlider === true);
      var filteredShortNews = resp.data.sort((a:any,b:any)=>{
        return b.createdAt - a.createdAt;
      });
      for(let i = 0;i < 3; i++){
        this.shortNews.push(filteredShortNews[i]);
      }
    })
  }

  getAllBlogs(){
    this.blogsService.GetAll().subscribe(resp=>{
      console.log(resp.data);
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
    }
    if(!this.CustomerRequest.isAnonymous){
      if((this.CustomerRequest.fullName ==='' || this.CustomerRequest.fullName === undefined || this.CustomerRequest.fullName === null)
      || (this.CustomerRequest.email ==='' || this.CustomerRequest.email === undefined || this.CustomerRequest.email === null)){
        this.showCustomerErrorMessage = true;
      }
    }
    if(!this.showCustomerErrorMessage){
      console.log(this.CustomerRequest);
      this.customerService.CreateRequest(this.CustomerRequest).subscribe(resp=>{
        console.log(resp);
        if(resp.succeeded){
          this.requestMessage.message = "Message sent successfully";
          this.requestMessage.color = "green";
        }
        else{
          this.requestMessage.message = "message not delivered";
          this.requestMessage.color = "red";
        }
      })
    }

  }
}
