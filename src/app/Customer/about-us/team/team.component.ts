import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../../Services/team.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  Founders:any[]=[];
  Workers:any[]=[];
  constructor(private service: TeamService, private translate: TranslateService) { }

  ngOnInit(): void {
    this.getAll(this.translate.currentLang)
    this.translate.onLangChange.subscribe((lang) => {
     this.getAll(lang.lang)
    });
  }
  getAll(lang:string):void {
    this.service.GetAll(lang).subscribe(resp=>{
      this.Founders = resp.data.filter((word:any) => word.isFounder === true);
      this.Workers = resp.data.filter((word:any) => word.isFounder === false);
    })
  }
}
