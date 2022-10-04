import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GaleryVideoItemService } from '../../../../Services/galery-video-item.service';
import { Video } from '../../../../Models/Video';

@Component({
  selector: 'app-create-video',
  templateUrl: './create-video.component.html',
  styleUrls: ['./create-video.component.css']
})
export class CreateVideoComponent implements OnInit {
  videoItem: Video = new Video();
  constructor(public dialogRef: MatDialogRef<CreateVideoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private videoService: GaleryVideoItemService) { }

  ngOnInit(): void {
    this.GetVideoForm();
    document.getElementsByTagName('body')[0].classList.add('block');
  }
  GetVideoForm() {
    this.videoService.GetForm().subscribe(resp => {
      this.videoItem = resp.data;
      this.videoItem.id = "create";
      this.videoItem.description.inputs.forEach(element => {
        element.value = "create video"
      });
    })
  }
  CreateVideo() {
    this.videoService.Create(this.videoItem).subscribe(resp => {
      this.GetVideoForm();
      this.dialogRef.close();
    })
  }
}
