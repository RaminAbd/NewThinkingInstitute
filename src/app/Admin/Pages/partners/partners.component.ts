import { Component, OnInit } from '@angular/core';
import { PartnersService } from '../../../Services/partners.service';
import { FileService } from '../../../Services/file.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { Partner } from '../../../Models/Partner';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class AdminPartnersComponent implements OnInit {
  fileLoading: boolean = false;
  file: any;
  Partners: Partner[] = [];
  PartnerForm: Partner = new Partner();
  isUpdate: boolean = false;
  constructor(
    private service: PartnersService,
    private fileService: FileService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
  ) { }


  ngOnInit(): void {
    this.getAll()
    this.primengConfig.ripple = true;
    this.getForm();
  }
  getAll() {
    this.service.GetAll().subscribe(resp => {
      this.Partners = resp.data
      console.log(resp);

    })
  }
  editItem(id: string) {
    this.getFormForUpdate(id);
    this.isUpdate = true;
  }
  HandleSubmit() {
    if (this.isUpdate === false) {
      this.PartnerForm.id = "create";
      console.log(this.PartnerForm);
      this.service.Create(this.PartnerForm).subscribe(resp => {
        console.log(resp);
        if (resp.succeeded === true) {
          this.getAll();
        }
      })
    }
    else{
      console.log(this.PartnerForm);
      this.service.Update(this.PartnerForm).subscribe(resp=>{
        console.log(resp);
        if(resp.succeeded === true){
          this.getAll()
          this.getForm()
        }

      })
    }
  }

  getForm() {
    this.service.GetForm().subscribe(resp => {
      this.PartnerForm = resp.data;
      this.isUpdate = false;
    })
  }
  getFormForUpdate(id: string) {
    this.service.GetForUpdate(id).subscribe(resp => {
      this.PartnerForm = resp.data;
    })
  }
  chooseFile(event: any) {
    this.fileLoading = true;
    const file = event.target.files[0];
    const fd = new FormData();
    fd.append('file', file);
    this.fileService.Create(fd).subscribe((resp: any) => {
      this.PartnerForm.photo = resp.data;
      this.fileLoading = false;
      this.file = resp.data;
    });
  }

  deleteAddedImage() {
    this.PartnerForm.photo = null;
    this.file = null;
  }

  confirm(event: any, id: string) {
    this.confirmationService.confirm({
      target: event.target,
      message: "Are you sure that you want to proceed?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        console.log(id);
        // console.log(this.deleteBlog(id));
        this.service.Delete(id).subscribe(resp => {
          this.getAll();
          if (resp.succeeded === true) {
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: "You have deleted"
            });
          }
          else {
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
