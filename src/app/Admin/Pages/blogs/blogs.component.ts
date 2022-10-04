import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/Models/Blog';

import { BlogService } from '../../../Services/blog.service';
import { FileService } from '../../../Services/file.service';
import { Router, ActivatedRoute } from '@angular/router';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ConfirmationService, MessageService, PrimeNGConfig} from 'primeng/api';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class AdminBlogsComponent implements OnInit {
  constructor(
    private service: BlogService,
    private fileService: FileService,
    private router: Router,
    private confirmationService:ConfirmationService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private route:ActivatedRoute,
    private confirmPopupModule:ConfirmPopupModule) { }
  Blogs: Blog[] = []
  ngOnInit(): void {
    this.getAll()
    this.primengConfig.ripple = true;
  }
  CreateBlog() {
    this.router.navigate(['admin/blog', "create"])
  }
  getAll() {
    this.service.GetAll().subscribe(resp => {
      this.Blogs = resp.data
    })
  }
  editBlog(id: string) {
    this.router.navigate(['admin/blog', id])
  }

  confirm(event: any, id:string) {
    this.confirmationService.confirm({
      target: event.target,
      message: "Are you sure that you want to proceed?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        console.log(id);
        // console.log(this.deleteBlog(id));
        this.service.Delete(id).subscribe(resp => {
          this.getAll();
          if(resp.succeeded === true){
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: "You have deleted"
            });
          }
          else{
            this.messageService.add({
              severity: "error",
              summary: "Rejected",
              detail: "You have rejected"
            });
          }
        })

      },
      reject: () => {

      }
    });

}
}
