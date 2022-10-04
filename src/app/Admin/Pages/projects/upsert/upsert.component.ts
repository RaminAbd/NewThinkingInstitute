import { Component, OnInit } from '@angular/core';
import { Project } from '../../../../Models/Project';
import { ProjectsService } from '../../../../Services/projects.service';
import { FileService } from '../../../../Services/file.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GaleryPhotoItemService } from '../../../../Services/galery-photo-item.service';
import { Photo } from '../../../../Models/Photo';
import { formatDate } from '@angular/common';
import { StatusService } from '../../../../Services/status.service';

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
  Statuses:any[]=[]
  selectedStatus:any;
  // nullItem:any={
  //   'name':'Select'
  // };
  constructor(
    private service: ProjectsService,
    private fileService: FileService,
    private router: Router,
    private galeryService:GaleryPhotoItemService,
    private statusService:StatusService,
    private route: ActivatedRoute) { this.id = this.route.snapshot.paramMap.get('id'); }

  ngOnInit(): void {
    this.getForm()
    // this.selectedStatus = this.nullItem;
    this.getStatuses();
    // this.myFormatDate(this.startDate)
    if(this.id === 'create'){
      this.selectedStatus = this.Statuses[0];
    }
  }
  getStatuses(){
    this.statusService.GetAll().subscribe(resp=>{
      this.Statuses = resp.data;
    })
  }
  getForm() {
    this.service.GetForm().subscribe(resp => {
      this.ProjectForm = resp.data;
    })
  }
  createdAt:any
  getFormForUpdate(id: string) {
    this.service.GetForUpdate(id).subscribe(resp => {
      this.ProjectForm = resp.data;
      console.log(this.ProjectForm);
      // this.createdAt = this.formatDateForYear(this.ProjectForm.createdAt)
    })
  }
  chooseFile(event: any) {
    const file = event.target.files[0];
    const fd = new FormData();
    fd.append('file', file);
    this.fileService.Create(fd).subscribe((resp: any) => {
      this.ProjectForm.image = resp.data;
    });
  }
  myFormatDate(date:Date){
    return (formatDate(new Date(date).setDate(new Date(date).getDate() + 1), 'yyyy/MM/dd', 'en'));
  }
  handleForm() {
    // console.log(this.ProjectForm);
    if (this.id === "create") {
      var photoObj:Photo = new Photo();
      this.ProjectForm.duration = this.myFormatDate(this.startDate) + "-" + this.myFormatDate(this.endDate);
      // this.ProjectForm.statusId
      console.log(this.ProjectForm);

      this.ProjectForm.id = "create";
      this.service.Create(this.ProjectForm).subscribe(resp=>{
        if(resp.succeeded === true){
          photoObj.id = this.ProjectForm.id;
          photoObj.title = this.ProjectForm.title;
          photoObj.description = this.ProjectForm.description;
          photoObj.photo = this.ProjectForm.image;
          this.router.navigate(['admin/projects'])
          this.galeryService.Create(photoObj).subscribe(resp1=>{
            console.log(resp1);
          })
        }
      })
    }
    else{
      this.service.Update(this.ProjectForm).subscribe(resp=>{
        if(resp.succeeded === true){
          this.router.navigate(['admin/projects'])
        }
      })
    }
  }
}
