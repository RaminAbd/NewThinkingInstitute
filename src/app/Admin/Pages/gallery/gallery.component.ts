import { Component, OnInit } from '@angular/core';
import { GaleryPhotoItemService } from '../../../Services/galery-photo-item.service';
import { Photo } from '../../../Models/Photo';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { FileService } from '../../../Services/file.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Video } from '../../../Models/Video';
import { GaleryVideoItemService } from '../../../Services/galery-video-item.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateVideoComponent } from './create-video/create-video.component';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class AdminGalleryComponent implements OnInit {
  Photos: Photo[] = [];
  photoItem: Photo = new Photo();
  fileLoading: boolean = false;
  fileName: string;
  file: any;
  displayURL: any;

  Videos: Video[] = [];
  constructor(private photoService: GaleryPhotoItemService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private fileService: FileService,
    private primengConfig: PrimeNGConfig,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private videoService: GaleryVideoItemService,) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.GetAllPhotos()
    this.GetPhotoForm();
    this.getAllVideos();
    this.displayURL = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/74CYIdYoQ5w');

  }
  TrustUrl(url: any) {
    //https://www.youtube.com/embed/AK-cb91BuAw
    var customUrl = `https://www.youtube.com/embed/` + url.split('/')[3];
    return this.sanitizer.bypassSecurityTrustResourceUrl(customUrl);
  }
  getAllVideos() {
    this.videoService.GetAll('ka-Geo').subscribe(resp => {
      this.Videos = resp.data;
      this.Videos.forEach(item => {
        item.videoURL = this.TrustUrl(item.videoURL)
      })
    })
  }
  openDialog() {
    const dialogRef = this.dialog.open(CreateVideoComponent, {
      height: '270px',
      width: '550px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllVideos();
      document.getElementsByTagName('body')[0].classList.remove('block');
    });
  }

  deleteVideo(e: any, id: string) {
    this.confirmationService.confirm({
      target: e.target,
      message: "Are you sure that you want to proceed?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.videoService.Delete(id).subscribe(resp => {
          this.getAllVideos();
          if (resp.succeeded === true) {
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: "You have deleted"
            });
          }
          else {
            this.messageService.add({
              severity: "error",
              summary: "Rejected",
              detail: "You have rejected"
            });
          }
        })

      },
      reject: () => {

      }
    });
  }


  GetPhotoForm() {
    this.photoService.GetForm().subscribe(resp => {
      this.photoItem = resp.data;
      this.photoItem.id = "create";
      this.photoItem.title.inputs.forEach(element => {
        element.value = "create image"
      });
      this.photoItem.description.inputs.forEach(element => {
        element.value = "create image"
      });
    })
  }

  GetAllPhotos() {
    this.photoService.GetAll().subscribe(resp => {
      this.Photos = resp.data;
    })
  }

  chooseFile(event: any) {
    this.fileLoading = true;
    const file = event.target.files[0];
    const fd = new FormData();
    fd.append('file', file);
    this.fileService.Create(fd).subscribe((resp: any) => {
      this.photoItem.photo = resp.data;
      this.fileLoading = false;
      this.file = resp.data;
    });
  }

  Create() {
    if (this.photoItem.photo !== null) {
      this.photoService.Create(this.photoItem).subscribe(resp => {
        this.GetAllPhotos();
        this.photoItem.photo = null;
        this.file = null;
      })
    }

  }

  deleteAddedImage() {
    this.photoItem.photo = null;
    this.file = null;
  }

  deleteImage(e: any, id: string) {
    this.confirmationService.confirm({
      target: e.target,
      message: "Are you sure that you want to proceed?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.photoService.Delete(id).subscribe(resp => {
          this.GetAllPhotos();
          if (resp.succeeded === true) {
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: "You have deleted"
            });
          }
          else {
            this.messageService.add({
              severity: "error",
              summary: "Rejected",
              detail: "You have rejected"
            });
          }
        })

      },
      reject: () => {

      }
    });
  }
}
