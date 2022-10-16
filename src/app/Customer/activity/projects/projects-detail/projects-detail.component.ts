import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../../../Services/news.service';
import { ProjectsService } from '../../../../Services/projects.service';
import { Project } from '../../../../Models/Project';

@Component({
  selector: 'app-projects-detail',
  templateUrl: './projects-detail.component.html',
  styleUrls: ['./projects-detail.component.css']
})
export class ProjectsDetailComponent implements OnInit {
  Item:Project = new Project();
  id:string;
  detailUrl:any;
  constructor(private route: ActivatedRoute, private service: ProjectsService,) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    this.detailUrl = window.location.origin + "/activity/projects/" + this.id;
    console.log(this.detailUrl);

    this.GetProjectById(this.id);
  }
  GetProjectById(id:string){
    this.service.GetProjectById(id).subscribe(resp =>{
      this.Item = resp.data;
    })
  }
}
