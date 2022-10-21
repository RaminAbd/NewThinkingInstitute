import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GaleryVideoItemService } from '../../../Services/galery-video-item.service';
import { Video } from '../../../Models/Video';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {
  Videos: Video[] = [];
  constructor(private sanitizer: DomSanitizer, private videoService: GaleryVideoItemService,private translate: TranslateService) { }
  displayURL:any;
  ngOnInit(): void {
    this.getAllVideos(this.translate.currentLang);
    this.displayURL = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/74CYIdYoQ5w');
    this.translate.onLangChange.subscribe((lang) => {
      this.getAllVideos(lang.lang)
     });
  }
  getAllVideos(lang:string) {
    this.videoService.GetAll(lang).subscribe(resp => {
      this.Videos = resp.data;
      console.log(this.Videos);
      this.Videos.forEach(item => {
        item.videoURL = this.TrustUrl(item.videoURL)
      })
    })
  }
  TrustUrl(url: any) {
    var customUrl = `https://www.youtube.com/embed/` + url.split('/')[3];
    return this.sanitizer.bypassSecurityTrustResourceUrl(customUrl);
  }
}
