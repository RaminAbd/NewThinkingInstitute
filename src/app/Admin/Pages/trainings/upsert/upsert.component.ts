import { Component, OnInit } from '@angular/core';
import { Training } from 'src/app/Models/Training';
import { TrainingsService } from '../../../../Services/trainings.service';
import { FileService } from '../../../../Services/file.service';
import { Router, ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-upsert',
  templateUrl: './upsert.component.html',
  styleUrls: ['./upsert.component.css']
})
export class AdminTrainingsUpsertComponent implements OnInit {

  id: any;
  TrainingForm: Training = new Training();
  startDate: any;
  endDate: any;
  constructor(
    private service: TrainingsService,
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
  myFormatDate(date: Date) {
    return (formatDate(new Date(date).setDate(new Date(date).getDate() + 1), 'yyyy/MM/dd', 'en'));
  }
  getForm() {
    this.service.GetForm().subscribe(resp => {
      this.TrainingForm = resp.data;
    })
  }
  getFormForUpdate(id: string) {
    this.service.GetForUpdate(id).subscribe(resp => {
      this.TrainingForm = resp.data;
      var dates: any[] = resp.data.duration.split('-');
      this.startDate = new Date(formatDate(new Date(dates[0]).setDate(new Date(dates[0]).getDate() + 1), 'yyyy/MM/dd', 'en')).toISOString().split('T')[0];
      this.endDate = new Date(formatDate(new Date(dates[1]).setDate(new Date(dates[1]).getDate() + 1), 'yyyy/MM/dd', 'en')).toISOString().split('T')[0];
    })
  }
  chooseFile(event: any) {
    const file = event.target.files[0];
    const fd = new FormData();
    fd.append('file', file);
    this.fileService.Create(fd).subscribe((resp: any) => {
      this.TrainingForm.image = resp.data;
    });
  }

  handleForm() {
    console.log(this.TrainingForm);
    if (this.id === "create") {
      this.TrainingForm.duration = this.myFormatDate(this.startDate) + "-" + this.myFormatDate(this.endDate);
      this.TrainingForm.id = "create";
      this.service.Create(this.TrainingForm).subscribe(resp => {
        if (resp.succeeded === true) {
          console.log(resp);
          this.router.navigate(['admin/trainings'])
        }
      })
    }
    else {
      this.service.Update(this.TrainingForm).subscribe(resp => {
        console.log(resp);

        if (resp.succeeded === true) {
          this.router.navigate(['admin/trainings'])
        }
      })
    }
  }

}
