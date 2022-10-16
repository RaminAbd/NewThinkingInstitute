import { Component, OnInit } from '@angular/core';
import { News } from '../../../../Models/News';
import { NewsService } from '../../../../Services/news.service';
import { FileService } from '../../../../Services/file.service';
import { Router, ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';
import { GaleryPhotoItemService } from '../../../../Services/galery-photo-item.service';
import { Photo } from 'src/app/Models/Photo';
import { Validation } from '../../../Helpers/Validation';
import { ServiceResponse } from '../../../../Models/ServiceResponse.model';
import { FormatDate } from '../../../Helpers/DateFormat';

@Component({
  selector: 'app-upsert',
  templateUrl: './upsert.component.html',
  styleUrls: ['./upsert.component.css']
})
export class AdminNewsUpsertComponent implements OnInit {
  id: any;
  NewsForm: News = new News();
  fileLoading: boolean = false;
  file: any;
  createdAt: any;
  validateResponse:ServiceResponse = new ServiceResponse();
  constructor(
    private service: NewsService,
    private fileService: FileService,
    private router: Router,
    private galeryService: GaleryPhotoItemService,
    private route: ActivatedRoute
  ) { this.id = this.route.snapshot.paramMap.get('id'); }

  ngOnInit(): void {
    if (this.id === "create") {
      this.getForm();
      this.createdAt = FormatDate.format(new Date())
    }
    else {
      this.getFormForUpdate(this.id);
    }
  }

  getForm() {
    this.service.GetForm().subscribe(resp => {
      this.NewsForm = resp.data;
    })
  }

  getFormForUpdate(id: string) {
    this.service.GetForUpdate(id).subscribe(resp => {
      this.NewsForm = resp.data;
      this.createdAt = FormatDate.format(this.NewsForm.createdAt)
    })
  }

  chooseFile(event: any) {
    this.fileLoading = true;
    const file = event.target.files[0];
    const fd = new FormData();
    fd.append('file', file);
    this.fileService.Create(fd).subscribe((resp: any) => {
      this.NewsForm.image = resp.data;
      this.fileLoading = false;
      this.file = resp.data;
    });
  }

  deleteAddedImage() {
    this.NewsForm.image = null;
    this.file = null;
  }

  handleForm() {

    this.validateResponse = Validation.validateForm(this.NewsForm, "news");
    this.NewsForm.createdAt = this.createdAt;
    if (this.validateResponse.succeeded === true) {
      if (this.id === "create") {
        var photoObj: Photo = new Photo();
        this.NewsForm.id = "create";
        console.log(this.NewsForm);

        this.service.Create(this.NewsForm).subscribe(resp => {
          if (resp.succeeded === true) {
            photoObj.id = this.NewsForm.id;
            photoObj.title = this.NewsForm.title;
            photoObj.description = this.NewsForm.description;
            photoObj.photo = this.NewsForm.image;
            this.router.navigate(['admin/news'])
            this.galeryService.Create(photoObj).subscribe(resp1 => { })
          }
          else {
            alert("Some error occurred!")
          }
        },
          (err: any) => {
            alert("Some error occurred!")
          })
      }
      else {
        console.log(this.NewsForm);

        this.service.Update(this.NewsForm).subscribe(resp => {
          if (resp.succeeded === true) {
            this.router.navigate(['admin/news'])
          }
        })
      }
    }
  }
}
