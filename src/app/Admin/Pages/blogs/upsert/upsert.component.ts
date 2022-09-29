import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../../../../Models/Blog';
import { BlogService } from '../../../../Services/blog.service';
import { FileService } from '../../../../Services/file.service';

@Component({
  selector: 'app-upsert',
  templateUrl: './upsert.component.html',
  styleUrls: ['./upsert.component.css']
})
export class AdminBlogUpsertComponent implements OnInit {
  id: any;
  BlogForm: Blog = new Blog();
  constructor(
    private service: BlogService,
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
      this.BlogForm = resp.data;
      console.log(this.BlogForm);
    })
  }
  createdAt:any
  getFormForUpdate(id: string) {
    this.service.GetForUpdate(id).subscribe(resp => {
      this.BlogForm = resp.data;
      console.log(this.BlogForm);
      this.createdAt = this.formatDateForYear(this.BlogForm.createdAt)
    })
  }
  chooseFile(event: any) {
    const file = event.target.files[0];
    const fd = new FormData();
    fd.append('file', file);
    this.fileService.Create(fd).subscribe((resp: any) => {
      // this.news.newsPhoto = resp.data;
      console.log(resp.data);
      this.BlogForm.image = resp.data;
    });
  }

  handleForm() {
    console.log(this.BlogForm);
    if (this.id === "create") {
      this.BlogForm.id = "create";
      this.service.Create(this.BlogForm).subscribe(resp=>{
        if(resp.succeeded === true){
          this.router.navigate(['admin/blogs'])
        }
      })
    }
    else{
      this.service.Update(this.BlogForm).subscribe(resp=>{
        if(resp.succeeded === true){
          this.router.navigate(['admin/blogs'])
        }
      })
    }
  }
  formatDateForYear(date: any) {
    console.log(date);

    var variableDate = new Date(formatDate(new Date(date).setDate(new Date(date).getDate() + 1), 'yyyy/MM/dd', 'en')).toISOString().split('T')[0];
    console.log(variableDate);

    return new Date(variableDate);
  }
}
