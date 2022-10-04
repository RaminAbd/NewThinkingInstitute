import { Component, OnInit } from '@angular/core';
import { Course } from '../../../../Models/Course';
import { CoursesService } from '../../../../Services/courses.service';
import { FileService } from '../../../../Services/file.service';
import { Router, ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-upsert',
  templateUrl: './upsert.component.html',
  styleUrls: ['./upsert.component.css']
})
export class AdminCoursesUpsertComponent implements OnInit {
  id: any;
 CourseForm: Course = new Course();
 startDate: any;
 endDate: Date = new Date();
  constructor(
    private service: CoursesService,
    private fileService: FileService,
    private router: Router,
    private route: ActivatedRoute) { this.id = this.route.snapshot.paramMap.get('id'); }

  ngOnInit(): void {
    if (this.id === "create") {
      this.getForm();
    }
    else {
      this.getFormForUpdate(this.id);
    }
  }
  myFormatDate(date:Date){
    return (formatDate(new Date(date).setDate(new Date(date).getDate() + 1), 'yyyy/MM/dd', 'en'));
  }
  getForm() {
    this.service.GetForm().subscribe(resp => {
      this.CourseForm = resp.data;
    })
  }
  getFormForUpdate(id: string) {
    this.service.GetForUpdate(id).subscribe(resp => {
      this.CourseForm = resp.data;
      //this.DateOfBirth = new Date(formatDate(new Date(this.personalInfo.dateOfBirth).setDate(new Date(this.personalInfo.dateOfBirth).getDate() + 1), 'yyyy/MM/dd', 'en')).toISOString().split('T')[0];
      //
      var dates:any[] = resp.data.duration.split('-');
      this.startDate = new Date(formatDate(new Date(dates[0]).setDate(new Date(dates[1]).getDate() + 1), 'yyyy/MM/dd', 'en')).toISOString().split('T')[0];

      //.setDate(new Date(dates[0].getDate())).getDate() + 1

      // this.startDate = new Date(formatDate(new Date(dates[0])), 'yyyy/MM/dd', 'en')).toISOString().split('T')[0];
      this.endDate = dates[1];
    })
  }
  chooseFile(event: any) {
    const file = event.target.files[0];
    const fd = new FormData();
    fd.append('file', file);
    this.fileService.Create(fd).subscribe((resp: any) => {
      this.CourseForm.image = resp.data;
    });
  }

  handleForm() {
    console.log(this.CourseForm);
    if (this.id === "create") {
      this.CourseForm.duration = this.myFormatDate(this.startDate) + "-" + this.myFormatDate(this.endDate);
      this.CourseForm.id = "create";
      this.service.Create(this.CourseForm).subscribe(resp=>{
        if(resp.succeeded === true){
          this.router.navigate(['admin/courses'])
        }
      })
    }
    else{
      this.service.Update(this.CourseForm).subscribe(resp=>{
        if(resp.succeeded === true){
          this.router.navigate(['admin/courses'])
        }
      })
    }
  }
}
