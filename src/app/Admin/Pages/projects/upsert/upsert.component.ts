import { Component, OnInit } from '@angular/core';
import { Project } from '../../../../Models/Project';
import { ProjectsService } from '../../../../Services/projects.service';
import { FileService } from '../../../../Services/file.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GaleryPhotoItemService } from '../../../../Services/galery-photo-item.service';
import { Photo } from '../../../../Models/Photo';
import { formatDate } from '@angular/common';
import { StatusService } from '../../../../Services/status.service';
import { ServiceResponse } from '../../../../Models/ServiceResponse.model';
import { FormatDate } from '../../../Helpers/DateFormat';
import { Validation } from '../../../Helpers/Validation';

@Component({
  selector: 'app-upsert',
  templateUrl: './upsert.component.html',
  styleUrls: ['./upsert.component.css']
})
export class AdminProjectsUpsertComponent implements OnInit {

  id: any;
  ProjectForm: Project = new Project();
  startDate: Date = new Date();
  endDate: Date = new Date();
  Statuses: any[] = []
  selectedStatus: any;
  fileLoading: boolean = false;
  file: any;
  createdAt: any;
  validateResponse: ServiceResponse = new ServiceResponse();
  constructor(
    private service: ProjectsService,
    private fileService: FileService,
    private router: Router,
    private galeryService: GaleryPhotoItemService,
    private statusService: StatusService,
    private route: ActivatedRoute) { this.id = this.route.snapshot.paramMap.get('id'); }

  ngOnInit(): void {
    this.getStatuses();
    if (this.id === "create") {
      this.getForm();
      this.endDate = FormatDate.format(new Date().setDate(new Date().getDate() + 1));
      this.startDate = FormatDate.format(new Date());
      this.selectedStatus = this.Statuses[0];
    }
    else {
      this.getFormForUpdate(this.id);
    }
  }
  getStatuses() {
    this.statusService.GetAll().subscribe(resp => {
      this.Statuses = resp.data;
    })
  }
  getForm() {
    this.service.GetForm().subscribe(resp => {
      this.ProjectForm = resp.data;
    })
  }

  getFormForUpdate(id: string) {
    this.service.GetForUpdate(id).subscribe(resp => {
      this.ProjectForm = resp.data;
      this.selectedStatus = resp.data.status;
    })
  }


  chooseFile(event: any) {
    this.fileLoading = true;
    const file = event.target.files[0];
    const fd = new FormData();
    fd.append('file', file);
    this.fileService.Create(fd).subscribe((resp: any) => {
      this.ProjectForm.image = resp.data;
      this.fileLoading = false;
      this.file = resp.data;
    });
  }

  deleteAddedImage() {
    this.ProjectForm.image = null;
    this.file = null;
  }

  handleForm() {
    this.validateResponse = Validation.validateForm(this.ProjectForm, "projects");
    if (this.validateResponse.succeeded === true) {
      this.ProjectForm.duration = formatDate(new Date(this.startDate), 'yyyy/MM/dd', 'en') + "-" + formatDate(new Date(this.endDate), 'yyyy/MM/dd', 'en');
      if (this.id === "create") {
        var photoObj: Photo = new Photo();
        this.ProjectForm.id = "create";
        this.ProjectForm.statusId = this.selectedStatus.id;
        this.service.Create(this.ProjectForm).subscribe(resp => {
          if (resp.succeeded === true) {
            photoObj.id = this.ProjectForm.id;
            photoObj.title = this.ProjectForm.title;
            photoObj.description = this.ProjectForm.description;
            photoObj.photo = this.ProjectForm.image;
            this.router.navigate(['admin/projects'])
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
        this.service.Update(this.ProjectForm).subscribe(resp => {
          if (resp.succeeded === true) {
            this.router.navigate(['admin/projects'])
          }
        })
      }
    }
  }
}
