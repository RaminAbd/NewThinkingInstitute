import { Component, OnInit } from '@angular/core';
import { Course } from '../../../../Models/Course';
import { CoursesService } from '../../../../Services/courses.service';
import { FileService } from '../../../../Services/file.service';
import { Router, ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';
import { ServiceResponse } from '../../../../Models/ServiceResponse.model';
import { FormatDate } from '../../../Helpers/DateFormat';
import { Validation } from '../../../Helpers/Validation';
import { Photo } from '../../../../Models/Photo';
import { GaleryPhotoItemService } from '../../../../Services/galery-photo-item.service';

@Component({
  selector: 'app-upsert',
  templateUrl: './upsert.component.html',
  styleUrls: ['./upsert.component.css']
})
export class AdminCoursesUpsertComponent implements OnInit {
  id: any;
  CourseForm: Course = new Course();
  startDate: any;
  endDate: any;
  fileLoading: boolean = false;
  file: any;
  createdAt: any;
  validateResponse: ServiceResponse = new ServiceResponse();
  constructor(
    private service: CoursesService,
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
      this.CourseForm = resp.data;
    })
  }

  getFormForUpdate(id: string) {
    this.service.GetForUpdate(id).subscribe(resp => {
      this.CourseForm = resp.data;
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
      this.CourseForm.image = resp.data;
      this.fileLoading = false;
      this.file = resp.data;
    });
  }

  deleteAddedImage() {
    this.CourseForm.image = null;
    this.file = null;
  }

  handleForm() {
    this.validateResponse = Validation.validateForm(this.CourseForm, "projects");
    if (this.validateResponse.succeeded === true) {
      this.CourseForm.duration = formatDate(new Date(this.startDate), 'yyyy/MM/dd', 'en') + "-" + formatDate(new Date(this.endDate), 'yyyy/MM/dd', 'en');
      if (this.id === "create") {
        this.CourseForm.id = "create";
        var photoObj: Photo = new Photo();
        this.service.Create(this.CourseForm).subscribe(resp => {
          if (resp.succeeded === true) {
            photoObj.id = this.CourseForm.id;
            photoObj.title = this.CourseForm.title;
            photoObj.description = this.CourseForm.description;
            photoObj.photo = this.CourseForm.image;
            this.router.navigate(['admin/courses'])
            this.galeryService.Create(photoObj).subscribe(resp1 => {
              console.log(resp1);
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
        this.service.Update(this.CourseForm).subscribe(resp => {
          if (resp.succeeded === true) {
            this.router.navigate(['admin/courses'])
          }
        })
      }
    }
  }
}
