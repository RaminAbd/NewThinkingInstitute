import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../../../Services/news.service';
import { ProjectsService } from '../../../../Services/projects.service';
import { Project } from '../../../../Models/Project';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-projects-detail',
  templateUrl: './projects-detail.component.html',
  styleUrls: ['./projects-detail.component.css']
})
export class ProjectsDetailComponent implements OnInit, OnDestroy {
  Item: Project = new Project();
  id: string;
  subscription: any
  detailUrl: any;
  constructor(private route: ActivatedRoute, private service: ProjectsService, private translate: TranslateService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    this.detailUrl = window.location.origin + "/activity/projects/" + this.id;
    this.subscription = this.translate.onLangChange.subscribe((lang) => {
      this.GetProjectById(this.id, this.translate.currentLang);
    });
    this.GetProjectById(this.id, this.translate.currentLang);

  }
  GetProjectById(id: string, lang: string): void {
    this.service.GetProjectById(id, lang).subscribe(resp => {
      this.Item = resp.data;
    })
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
