import { Component, OnInit } from '@angular/core';
import { TrainingsService } from '../../../Services/trainings.service';

@Component({
  selector: 'app-trainings-and-seminars',
  templateUrl: './trainings-and-seminars.component.html',
  styleUrls: ['./trainings-and-seminars.component.css']
})
export class TrainingsAndSeminarsComponent implements OnInit {

  Services:any[]=[];
  constructor(private service:TrainingsService) { }
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
