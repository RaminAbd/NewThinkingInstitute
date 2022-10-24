import { Component, OnInit } from '@angular/core';
import { Accounts } from '../../../../Models/Accounts';
import { ServiceResponse } from '../../../../Models/ServiceResponse.model';
import { AccountsService } from '../../../../Services/accounts.service';
import { FileService } from '../../../../Services/file.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GaleryPhotoItemService } from '../../../../Services/galery-photo-item.service';
import { GaleryVideoItemService } from '../../../../Services/galery-video-item.service';
import { FormatDate } from '../../../Helpers/DateFormat';
import { Validation } from '../../../Helpers/Validation';
import { Photo } from '../../../../Models/Photo';
import { Video } from '../../../../Models/Video';

@Component({
  selector: 'app-upsert',
  templateUrl: './upsert.component.html',
  styleUrls: ['./upsert.component.css']
})
export class AdminAccountsUpsertComponent implements OnInit {
  id: any;
  AccountsForm: Accounts = new Accounts();
  fileLoading: boolean = false;
  file: any;
  createdAt: any;
  validateResponse:ServiceResponse = new ServiceResponse();
  constructor(
    private service:  AccountsService,
    private fileService: FileService,
    private router: Router,
    private galeryService: GaleryPhotoItemService,
    private route: ActivatedRoute,
    private videoService: GaleryVideoItemService
  ) { this.id = this.route.snapshot.paramMap.get('id'); }
  ngOnInit(): void {
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
      this.AccountsForm = resp.data;
    })
  }

  getFormForUpdate(id: string) {
    this.service.GetForUpdate(id).subscribe(resp => {
      this.AccountsForm = resp.data;
      this.createdAt = FormatDate.format(this.AccountsForm.createdAt)
    })
  }
  chooseFile(event: any) {
    this.fileLoading = true;
    const file = event.target.files[0];
    const fd = new FormData();
    fd.append('file', file);
    this.fileService.Create(fd).subscribe((resp: any) => {
      this.AccountsForm.image = resp.data;
      this.fileLoading = false;
      this.file = resp.data;
    });
  }
  deleteAddedImage() {
    this.AccountsForm.image = null;
    this.file = null;
  }
  handleForm() {

    this.validateResponse = Validation.validateForm(this.AccountsForm, "news");
    this.AccountsForm.createdAt = this.createdAt;
    if (this.validateResponse.succeeded === true) {
      if (this.id === "create") {
        var photoObj: Photo = new Photo();
        this.AccountsForm.id = "create";
        this.service.Create(this.AccountsForm).subscribe(resp => {
          if (resp.succeeded === true) {
            photoObj.id = this.AccountsForm.id;
            photoObj.title = this.AccountsForm.title;
            photoObj.description = this.AccountsForm.description;
            photoObj.photo = this.AccountsForm.image;
            this.router.navigate(['admin/accounts'])
            if(this.AccountsForm.videoURL ===null || this.AccountsForm.videoURL === undefined || this.AccountsForm.videoURL === ""){
              this.galeryService.Create(photoObj).subscribe(resp1 => { })
            }
            else{

              var videoItem = new Video();
              videoItem.title = this.AccountsForm.title;
              videoItem.description = this.AccountsForm.description;
              videoItem.videoURL = this.AccountsForm.videoURL;
              videoItem.id="create";

               this.videoService.Create(videoItem).subscribe(resp1 => {})
            }
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
        this.service.Update(this.AccountsForm).subscribe(resp => {
          if (resp.succeeded === true) {
            this.router.navigate(['admin/accounts'])
          }
        })
      }
    }
  }
}
