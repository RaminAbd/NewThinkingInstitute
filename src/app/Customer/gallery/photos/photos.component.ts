import { Component, OnInit } from '@angular/core';
import { GaleryPhotoItemService } from '../../../Services/galery-photo-item.service';
import { Photo } from '../../../Models/Photo';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  Photos:Photo[] = [];
  constructor(private photoService: GaleryPhotoItemService) { }

  ngOnInit(): void {
    this.GetAllPhotos();
  }
  GetAllPhotos() {
    this.photoService.GetAll().subscribe(resp => {
      this.Photos = resp.data;
      console.log(resp.data);

    })
  }
}
