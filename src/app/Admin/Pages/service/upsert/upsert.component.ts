import { Component, OnInit } from '@angular/core';
import { ServiceModel } from '../../../../Models/Service.model';
import { ServiceService } from '../../../../Services/service.service';
import { FileService } from '../../../../Services/file.service';
import { Router, ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-upsert',
  templateUrl: './upsert.component.html',
  styleUrls: ['./upsert.component.css']
})
export class AdminServiceUpsertComponent implements OnInit {
  id:any;
  ServiceForm: ServiceModel = new ServiceModel();
  startDate: any;
  endDate: any;
   constructor(
     private service: ServiceService,
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
    myFormatDate(date:Date){
      return (formatDate(new Date(date).setDate(new Date(date).getDate() + 1), 'yyyy/MM/dd', 'en'));
    }
    getForm() {
      this.service.GetForm().subscribe(resp => {
        this.ServiceForm = resp.data;
      })
    }
    getFormForUpdate(id: string) {
      this.service.GetForUpdate(id).subscribe(resp => {
        this.ServiceForm = resp.data;
        var dates:any[] = resp.data.duration.split('-');
        this.startDate = new Date(formatDate(new Date(dates[0]).setDate(new Date(dates[0]).getDate() + 1), 'yyyy/MM/dd', 'en')).toISOString().split('T')[0];
        this.endDate = new Date(formatDate(new Date(dates[1]).setDate(new Date(dates[1]).getDate() + 1), 'yyyy/MM/dd', 'en')).toISOString().split('T')[0];
      })
    }
  chooseFile(event: any) {
    const file = event.target.files[0];
    const fd = new FormData();
    fd.append('file', file);
    this.fileService.Create(fd).subscribe((resp: any) => {
      this.ServiceForm.image = resp.data;
    });
  }

  handleForm() {
    console.log(this.ServiceForm);
    if (this.id === "create") {
      this.ServiceForm.duration = this.myFormatDate(this.startDate) + "-" + this.myFormatDate(this.endDate);
      this.ServiceForm.id = "create";
      this.service.Create(this.ServiceForm).subscribe(resp=>{
        if(resp.succeeded === true){
          this.router.navigate(['admin/services'])
        }
      })
    }
    else{
      this.service.Update(this.ServiceForm).subscribe(resp=>{
        console.log(resp);
        if(resp.succeeded === true){
          this.router.navigate(['admin/services'])
        }
      })
    }
  }
}
