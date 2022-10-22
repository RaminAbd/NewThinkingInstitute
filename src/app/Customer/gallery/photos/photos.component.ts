import { Component, OnInit } from '@angular/core';
import { GaleryPhotoItemService } from '../../../Services/galery-photo-item.service';
import { Photo } from '../../../Models/Photo';
import { PhotoPagingResponse } from '../../../Models/PhotoPagingResponse';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  Photos: Photo[] = [];
  Response: PhotoPagingResponse = new PhotoPagingResponse();
  constructor(private photoService: GaleryPhotoItemService) { }

  ngOnInit(): void {
    this.GetAllPhotos(1);
  }
  GetAllPhotos(index: number) {

    this.photoService.GetAllWithPaging(index).subscribe(resp => {
      this.Response = resp.data;
      this.Photos = resp.data.items;
      console.log(resp.data);
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    })
  }
}
