import { Component, OnInit } from '@angular/core';
import { News } from '../../../../Models/News';
import { NewsService } from '../../../../Services/news.service';
import { FileService } from '../../../../Services/file.service';
import { Router, ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-upsert',
  templateUrl: './upsert.component.html',
  styleUrls: ['./upsert.component.css']
})
export class AdminNewsUpsertComponent implements OnInit {

  id: any;
  NewsForm: News = new News();
  constructor(
    private service: NewsService,
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
  getForm() {
    this.service.GetForm().subscribe(resp => {
      this.NewsForm = resp.data;
      console.log(this.NewsForm);
    })
  }
  createdAt:any
  getFormForUpdate(id: string) {
    this.service.GetForUpdate(id).subscribe(resp => {
      this.NewsForm = resp.data;
      console.log(this.NewsForm);
      this.createdAt = this.formatDateForYear(this.NewsForm.createdAt)
    })
  }
  chooseFile(event: any) {
    const file = event.target.files[0];
    const fd = new FormData();
    fd.append('file', file);
    this.fileService.Create(fd).subscribe((resp: any) => {
      this.NewsForm.image = resp.data;
    });
  }
  formatDateForYear(date: any) {
    var variableDate = new Date(formatDate(new Date(date).setDate(new Date(date).getDate() + 1), 'yyyy/MM/dd', 'en')).toISOString().split('T')[0];
    return new Date(variableDate);
  }
  handleForm() {
    console.log(this.NewsForm);
    if (this.id === "create") {
      this.NewsForm.id = "create";
      this.service.Create(this.NewsForm).subscribe(resp=>{
        if(resp.succeeded === true){
          this.router.navigate(['admin/news'])
        }
      })
    }
    else{
      this.service.Update(this.NewsForm).subscribe(resp=>{
        if(resp.succeeded === true){
          this.router.navigate(['admin/news'])
        }
      })
    }
  }
}
