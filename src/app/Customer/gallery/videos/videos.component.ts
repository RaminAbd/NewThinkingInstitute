import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {

  constructor(private sanitizer: DomSanitizer) { }
  displayURL:any;
  ngOnInit(): void {
    this.displayURL = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/74CYIdYoQ5w');
  }

}
