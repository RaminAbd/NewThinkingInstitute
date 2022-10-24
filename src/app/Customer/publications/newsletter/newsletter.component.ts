import { Component, OnInit } from '@angular/core';
import { NewsletterService } from 'src/app/Services/newsletter.service';
import { Research } from '../../../Models/Research';
import { TranslateService } from '@ngx-translate/core';
import { FileService } from '../../../Services/file.service';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent implements OnInit {

  researchItems: Research[] = [];
  lang:any;
  constructor(private researchService: NewsletterService, private translate: TranslateService, private fileService: FileService) {
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
  GetDocumentation(file1: any) {
    console.log(file1);
    this.isLoading = false;
    this.fileService.DownloadFile(file1.fileId).subscribe((blob: Blob) => {
      const file = new Blob([blob], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      var a = document.createElement('a');
      a.href = fileURL;
      a.target = '_blank';
      a.download = `${file1.title}.pdf`;
      document.body.appendChild(a);
      a.click();
    })
  }

}
