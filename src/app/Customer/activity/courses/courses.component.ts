import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/Services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  Services:any[]=[];
  constructor(private service:CoursesService) { }
  ngOnInit(): void {
    this.getAll()
  }
  getAll(){
    this.service.GetAll().subscribe(resp=>{
      this.Services = resp.data;
      console.log(resp.data);
    })
  }
}
