import { Component, Inject, OnInit } from '@angular/core';
import { StatusService } from '../../../../Services/status.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectStatus } from '../../../../Models/ProjectStatus';

@Component({
  selector: 'app-create-status',
  templateUrl: './create-status.component.html',
  styleUrls: ['./create-status.component.css']
})
export class CreateStatusComponent implements OnInit {
  StatusForm: ProjectStatus = new ProjectStatus()
  constructor(private service: StatusService,
    public dialogRef: MatDialogRef<CreateStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {

    document.getElementsByTagName('body')[0].classList.add('block');
    if (this.data.action === "create") {
      this.getForm()
    }
    else {
      this.GetForUpdate(this.data.id);
    }
  }
  getForm() {
    this.service.GetForm().subscribe(resp => {
      this.StatusForm = resp.data;
    })
  }
  GetForUpdate(id: string) {
    this.service.GetForUpdate(id).subscribe(resp => {
      this.StatusForm = resp.data;
    })
  }
  CreateStatus() {
    if(this.data.action === "create"){
      this.service.Create(this.StatusForm).subscribe((resp => {
        if (resp.succeeded) {
          this.dialogRef.close();
        }
      }))
    }
    else{
      this.service.Update(this.StatusForm).subscribe(resp => {
        if(resp.succeeded === true){
          this.dialogRef.close();
        }
      })
    }

  }
}
