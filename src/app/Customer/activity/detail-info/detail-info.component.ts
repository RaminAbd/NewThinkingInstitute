import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../../Services/service.service';
import { CoursesService } from '../../../Services/courses.service';
import { TrainingsService } from '../../../Services/trainings.service';

@Component({
  selector: 'app-detail-info',
  templateUrl: './detail-info.component.html',
  styleUrls: ['./detail-info.component.css']
})
export class DetailInfoComponent implements OnInit {
  id: string;
  type: string;
  Item: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceService: ServiceService,
    private coursesService: CoursesService,
    private trainingsService: TrainingsService,
  ) {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    this.type = this.route.snapshot.paramMap.get('type') as string;
  }
  getService(id:string){
    this.serviceService.GetById(id).subscribe(resp => {
      this.Item = resp.data;
      console.log(this.Item);
    })
  }
  getCourse(id:string) {
    this.coursesService.GetById(id).subscribe(resp => {
      this.Item = resp.data;
    })
  }
  getTraining(id:string) {
    this.trainingsService.GetById(id).subscribe(resp => {
      this.Item = resp.data;
    })
  }
  ngOnInit(): void {
    console.log(this.type);
    switch (this.type) {
      case 'service': {
        this.getService(this.id);
        break;
      }
      case 'courses': {
        this.getCourse(this.id);
        break;
      }
      case 'trainings-and-seminars': {
        this.getTraining(this.id);
        break;
      }
      default: {
        alert('Something went wrong');
        this.router.navigate(['/main']);
        break;
      }
    }


  }

}
