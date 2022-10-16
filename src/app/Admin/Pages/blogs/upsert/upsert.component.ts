import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../../../../Models/Blog';
import { BlogService } from '../../../../Services/blog.service';
import { FileService } from '../../../../Services/file.service';
import { ServiceResponse } from '../../../../Models/ServiceResponse.model';
import { FormatDate } from '../../../Helpers/DateFormat';
import { Validation } from 'src/app/Admin/Helpers/Validation';
import { Photo } from '../../../../Models/Photo';
import { GaleryPhotoItemService } from '../../../../Services/galery-photo-item.service';

@Component({
  selector: 'app-upsert',
  templateUrl: './upsert.component.html',
  styleUrls: ['./upsert.component.css']
})
export class AdminBlogUpsertComponent implements OnInit {
  id: any;
  BlogForm: Blog = new Blog();
  fileLoading: boolean = false;
  authorFileLoading: boolean = false;
  file: any;
  authorFile:any;
  createdAt: any;
  validateResponse: ServiceResponse = new ServiceResponse();
  constructor(
    private service: BlogService,
    private fileService: FileService,
    private router: Router,
    private galeryService: GaleryPhotoItemService,
    private route: ActivatedRoute
  ) { this.id = this.route.snapshot.paramMap.get('id'); }

  ngOnInit(): void {
    this.getPhotoForm()
    if (this.id === "create") {
      this.getForm();
      this.createdAt = FormatDate.format(new Date())
    }
    else {
      this.getFormForUpdate(this.id);
    }
  }

  getForm() {
    this.service.GetForm().subscribe(resp => {
      console.log(resp.data, "blog form");

      this.BlogForm = resp.data;
    })
  }

  getFormForUpdate(id: string) {
    this.service.GetForUpdate(id).subscribe(resp => {
      this.BlogForm = resp.data;
      this.createdAt = FormatDate.format(this.BlogForm.createdAt)
    })
  }

  chooseFile(event: any) {
    this.fileLoading = true;
    const file = event.target.files[0];
    const fd = new FormData();
    fd.append('file', file);
    this.fileService.Create(fd).subscribe((resp: any) => {
      this.BlogForm.image = resp.data;
      this.fileLoading = false;
      this.file = resp.data;
    });
  }
  chooseFileForAuthor(event: any) {
    this.authorFileLoading = true;
    const file = event.target.files[0];
    const fd = new FormData();
    fd.append('file', file);
    this.fileService.Create(fd).subscribe((resp: any) => {
      this.BlogForm.authorImage = resp.data;
      this.authorFileLoading = false;
      this.authorFile = resp.data;
    });
  }
  deleteAddedAuthorImage() {
    this.BlogForm.authorImage = null;
    this.authorFile = null;
  }
  deleteAddedImage() {
    this.BlogForm.image = null;
    this.file = null;
  }
  getPhotoForm(){
    this.galeryService.GetForm().subscribe(resp=>{
      console.log(resp, "photo form");
    })
  }
  handleForm() {
    this.validateResponse = Validation.validateForm(this.BlogForm, "blog");
    console.log(this.validateResponse);
    this.BlogForm.createdAt = this.createdAt;
    if (this.validateResponse.succeeded === true) {
      if (this.id === "create") {
        this.BlogForm.id = "create";
        console.log(this.BlogForm);

        var photoObj: Photo = new Photo();
        photoObj.id = this.BlogForm.id;
        photoObj.title = this.BlogForm.title;
        photoObj.description = this.BlogForm.description;
        photoObj.photo = this.BlogForm.image;
        console.log(photoObj);

        this.service.Create(this.BlogForm).subscribe(resp=>{
          if(resp.succeeded === true){

            this.router.navigate(['admin/blogs'])
            this.galeryService.Create(photoObj).subscribe(resp1 => { })
          }
          else {
            alert("Some error occurred!")
          }
        },
        (err: any) => {
          alert("Some error occurred!")
        })
      }
      else {
        this.service.Update(this.BlogForm).subscribe(resp => {
          if (resp.succeeded === true) {
            this.router.navigate(['admin/blogs'])
          }
        })
      }
    }
  }

}
