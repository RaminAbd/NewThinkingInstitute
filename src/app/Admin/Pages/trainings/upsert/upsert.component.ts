import { Component, OnInit } from '@angular/core';
import { Training } from 'src/app/Models/Training';
import { TrainingsService } from '../../../../Services/trainings.service';
import { FileService } from '../../../../Services/file.service';
import { Router, ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';
import { ServiceResponse } from '../../../../Models/ServiceResponse.model';
import { GaleryPhotoItemService } from '../../../../Services/galery-photo-item.service';
import { FormatDate } from '../../../Helpers/DateFormat';
import { Validation } from '../../../Helpers/Validation';
import { Photo } from '../../../../Models/Photo';

@Component({
  selector: 'app-upsert',
  templateUrl: './upsert.component.html',
  styleUrls: ['./upsert.component.css']
})
export class AdminTrainingsUpsertComponent implements OnInit {

  id: any;
  TrainingForm: Training = new Training();
  startDate: any;
  endDate: any;
  fileLoading: boolean = false;
  file: any;
  createdAt: any;
  validateResponse: ServiceResponse = new ServiceResponse();
  constructor(
    private service: TrainingsService,
    private fileService: FileService,
    private galeryService: GaleryPhotoItemService,
    private router: Router,
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
      this.TrainingForm = resp.data;
    })
  }
  getFormForUpdate(id: string) {
    this.service.GetForUpdate(id).subscribe(resp => {
      this.TrainingForm = resp.data;
      var dates: any[] = resp.data.duration.split('-');
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
      this.TrainingForm.image = resp.data;
      this.fileLoading = false;
      this.file = resp.data;
    });
  }

  deleteAddedImage() {
    this.TrainingForm.image = null;
    this.file = null;
  }

  handleForm() {
    this.validateResponse = Validation.validateForm(this.TrainingForm, "projects");
    if (this.validateResponse.succeeded === true) {
      this.TrainingForm.duration = formatDate(new Date(this.startDate), 'yyyy/MM/dd', 'en') + "-" + formatDate(new Date(this.endDate), 'yyyy/MM/dd', 'en');
      if (this.id === "create") {
        this.TrainingForm.id = "create";
        var photoObj: Photo = new Photo();
        this.service.Create(this.TrainingForm).subscribe(resp => {
          if (resp.succeeded === true) {
            photoObj.id = this.TrainingForm.id;
            photoObj.title = this.TrainingForm.title;
            photoObj.description = this.TrainingForm.description;
            photoObj.photo = this.TrainingForm.image;
            this.router.navigate(['admin/trainings'])
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
        this.service.Update(this.TrainingForm).subscribe(resp => {
          if (resp.succeeded === true) {
            this.router.navigate(['admin/trainings'])
          }
        })
      }
    }
  }

}
