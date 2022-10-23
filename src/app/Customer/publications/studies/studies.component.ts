import { Component, OnInit } from '@angular/core';
import { ResearchService } from 'src/app/Services/research.service';
import { TranslateService } from '@ngx-translate/core';
import { Research } from 'src/app/Models/Research';

@Component({
  selector: 'app-studies',
  templateUrl: './studies.component.html',
  styleUrls: ['./studies.component.css']
})
export class StudiesComponent implements OnInit {
  researchItems: Research[] = [];
  lang:any;
  constructor(private researchService: ResearchService, private translate: TranslateService) {
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

    // const file = new Blob([fileURL], {type: 'application/pdf'});
    // const fileUrl = URL.createObjectURL(fileURL);
    window.open(fileURL);
    var a         = document.createElement('a');
        // a.href        = fileURL;
        a.target      = '_blank';
        a.download    = 'UEDocs.pdf';
        document.body.appendChild(a);
        a.click();
  }
}
