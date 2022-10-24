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
  item: Photo = new Photo();
  Response: PhotoPagingResponse = new PhotoPagingResponse();
  constructor(private photoService: GaleryPhotoItemService) { }

  ngOnInit(): void {
    this.GetAllPhotos(1);
  }
  GetAllPhotos(index: number) {

    this.photoService.GetAllWithPaging(index).subscribe(resp => {
      this.Response = resp.data;
      this.Photos = resp.data.items;
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    })
  }
  closeLightbox() {
    this.lightBoxActive = false;
    document.getElementsByTagName('body')[0].classList.remove('block');
  }
  lightBoxActive: boolean = false;
  openLightBox(item: any) {
    window.scroll({
      top: 0,
      left: 0,
      // behavior: 'smooth'
    });
    this.item = item;
    this.lightBoxActive = true;
    // setTimeout(() => {
    //   // document.getElementsByTagName('body')[0].classList.add('block');
    // }, 1000)

  }
}
