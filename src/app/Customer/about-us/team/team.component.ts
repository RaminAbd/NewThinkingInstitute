import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../../Services/team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  Founders:any[]=[];
  Workers:any[]=[];
  constructor(private service: TeamService) { }

  ngOnInit(): void {
    this.getAll();
  }
  getAll(){
    this.service.GetAll().subscribe(resp=>{
      this.Founders = resp.data.filter((word:any) => word.isFounder === true);
      this.Workers = resp.data.filter((word:any) => word.isFounder === false);
    })
  }
}
