import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';
import { FileService } from '../../../Services/file.service';
import { CoursesService } from '../../../Services/courses.service';
import { Course } from '../../../Models/Course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class AdminCoursesComponent implements OnInit {
  Courses:Course[] = [];
  constructor(
    private service: CoursesService,
    private fileService: FileService,
    private router: Router,
    private confirmationService:ConfirmationService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
  ) { }

  ngOnInit(): void {
    this.getAll()
    this.primengConfig.ripple = true;
  }
  getAll() {
    this.service.GetAll('ka-Geo').subscribe(resp => {
      this.Courses = resp.data
    })
  }
  CreateBlog() {
    this.router.navigate(['admin/courses', "create"])
  }
  editBlog(id: string) {
    this.router.navigate(['admin/courses', id])
  }
  confirm(event: any, id:string) {
    this.confirmationService.confirm({
      target: event.target,
      message: "Are you sure that you want to proceed?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.service.Delete(id).subscribe(resp => {
          this.getAll();
          if(resp.succeeded === true){
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: "You have deleted"
            });
          }
          else{
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
