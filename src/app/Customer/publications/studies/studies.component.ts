import { Component, OnInit } from '@angular/core';
import { ResearchService } from 'src/app/Services/research.service';
import { TranslateService } from '@ngx-translate/core';
import { Research } from 'src/app/Models/Research';
import { FileService } from '../../../Services/file.service';

@Component({
  selector: 'app-studies',
  templateUrl: './studies.component.html',
  styleUrls: ['./studies.component.css']
})
export class StudiesComponent implements OnInit {
  researchItems: Research[] = [];
  lang: any;
  constructor(private researchService: ResearchService, private translate: TranslateService, private fileService: FileService) {
    this.translate.onLangChange.subscribe((lang) => {
      if (this.lang !== lang.lang) {
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
