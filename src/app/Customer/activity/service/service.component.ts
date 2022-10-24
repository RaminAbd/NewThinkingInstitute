import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServiceService } from '../../../Services/service.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit, OnDestroy {
  subscription:any
  Services:any[]=[];
  constructor(private service:ServiceService, private translate: TranslateService) { }
  ngOnInit(): void {
    this.getAll(this.translate.currentLang)
    this.subscription = this.translate.onLangChange.subscribe((lang) => {
      this.getAll(lang.lang)
     });
  }
  getAll(lang:string){
    this.service.GetAll(lang).subscribe(resp=>{
      this.Services = resp.data;
      console.log(resp.data);
    })
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
