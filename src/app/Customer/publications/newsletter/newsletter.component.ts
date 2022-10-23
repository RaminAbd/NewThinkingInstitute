import { Component, OnInit } from '@angular/core';
import { NewsletterService } from 'src/app/Services/newsletter.service';
import { Research } from '../../../Models/Research';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent implements OnInit {

  researchItems: Research[] = [];
  lang:any;
  constructor(private researchService: NewsletterService, private translate: TranslateService) {
    this.translate.onLangChange.subscribe((lang) => {
      if(this.lang !== lang.lang){
        this.lang = lang.lang
        this.GetAll(lang.lang)
      }
    });
  }

  ngOnInit(): void {
    this.GetAll(this.translate.currentLang);
  }
  GetAll(lang: string) {
    this.researchService.GetAll(lang).subscribe(resp => {
      this.researchItems = resp.data;
      console.log(resp);

    })
  }
  isLoading: boolean = false;
  GetDocumentation(fileURL: string) {
    console.log("dsvbd");
    this.isLoading = false;
    window.open(fileURL);
    var a         = document.createElement('a');
        // a.href        = fileURL;
        a.target      = '_blank';
        a.download    = 'UEDocs.pdf';
        document.body.appendChild(a);
        a.click();
  }

}
