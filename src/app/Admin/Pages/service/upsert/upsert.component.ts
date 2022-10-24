import { Component, OnInit } from '@angular/core';
import { ServiceModel } from '../../../../Models/Service.model';
import { ServiceService } from '../../../../Services/service.service';
import { FileService } from '../../../../Services/file.service';
import { Router, ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';
import { Validation } from '../../../Helpers/Validation';
import { FormatDate } from '../../../Helpers/DateFormat';
import { GaleryPhotoItemService } from '../../../../Services/galery-photo-item.service';
import { ServiceResponse } from '../../../../Models/ServiceResponse.model';
import { Photo } from '../../../../Models/Photo';

@Component({
  selector: 'app-upsert',
  templateUrl: './upsert.component.html',
  styleUrls: ['./upsert.component.css']
})
export class AdminServiceUpsertComponent implements OnInit {
  id:any;
  ServiceForm: ServiceModel = new ServiceModel();
  startDate: any;
  endDate: any;
  fileLoading: boolean = false;
  file: any;
  createdAt: any;
  validateResponse: ServiceResponse = new ServiceResponse();
   constructor(
     private service: ServiceService,
     private fileService: FileService,
     private router: Router,
     private galeryService: GaleryPhotoItemService,
     private route: ActivatedRoute) { this.id = this.route.snapshot.paramMap.get('id'); }

     ngOnInit(): void {
      if (this.id === "create") {
        this.getForm();
        this.endDate = FormatDate.format(new Date().setDate(new Date().getDate() + 1));
        this.startDate = FormatDate.format(new Date());
      }
      else {
        this.getFormForUpdate(this.id);
      }
    }

    getForm() {
      this.service.GetForm().subscribe(resp => {
        this.ServiceForm = resp.data;
      })
    }
    getFormForUpdate(id: string) {
      this.service.GetForUpdate(id).subscribe(resp => {
        this.ServiceForm = resp.data;
        var dates:any[] = resp.data.duration.split('-');
        this.startDate = new Date(formatDate(new Date(dates[0]).setDate(new Date(dates[0]).getDate() + 1), 'yyyy/MM/dd', 'en')).toISOString().split('T')[0];
        this.endDate = new Date(formatDate(new Date(dates[1]).setDate(new Date(dates[1]).getDate() + 1), 'yyyy/MM/dd', 'en')).toISOString().split('T')[0];
      })
    }

    chooseFile(event: any) {
      this.fileLoading = true;
      const file = event.target.files[0];
      const fd = new FormData();
      fd.append('file', file);
      this.fileService.Create(fd).subscribe((resp: any) => {
        this.ServiceForm.image = resp.data;
        this.fileLoading = false;
        this.file = resp.data;
      });
    }

  deleteAddedImage() {
    this.ServiceForm.image = null;
    this.file = null;
  }

  handleForm() {
    this.validateResponse = Validation.validateForm(this.ServiceForm, "projects");
    if (this.validateResponse.succeeded === true) {
      this.ServiceForm.duration = formatDate(new Date(this.startDate), 'yyyy/MM/dd', 'en') + "-" + formatDate(new Date(this.endDate), 'yyyy/MM/dd', 'en');
      if (this.id === "create") {
        this.ServiceForm.id = "create";
        var photoObj: Photo = new Photo();
        this.service.Create(this.ServiceForm).subscribe(resp => {
          if (resp.succeeded === true) {
            photoObj.id = this.ServiceForm.id;
            photoObj.title = this.ServiceForm.title;
            photoObj.description = this.ServiceForm.description;
            photoObj.photo = this.ServiceForm.image;
            this.router.navigate(['admin/services'])
            this.galeryService.Create(photoObj).subscribe(resp1 => {
            })
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
        this.service.Update(this.ServiceForm).subscribe(resp => {
          if (resp.succeeded === true) {
            this.router.navigate(['admin/services'])
          }
        })
      }
    }
  }
}
