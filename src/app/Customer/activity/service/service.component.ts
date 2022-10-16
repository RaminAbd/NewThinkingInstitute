import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../Services/service.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  Services:any[]=[];
  constructor(private service:ServiceService) { }
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
