import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../../Services/projects.service';
import { NewsPagingResponse } from '../../../Models/NewsPagingResponse.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  Response:NewsPagingResponse = new NewsPagingResponse();
  constructor(private service:ProjectsService) { }
  Projects:any[]=[]
  ngOnInit(): void {

    this.GetAllWithPaging(1)
  }
  GetAllWithPaging(index:any){
    this.service.GetAllWithPaging(index).subscribe(resp=>{
      this.Response = resp.data;
      this.Projects = resp.data.items;
      console.log(resp.data);
    })
  }
}
