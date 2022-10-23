import { Component, OnInit } from '@angular/core';
import { ServiceResponse } from '../../../../Models/ServiceResponse.model';
import { TeamService } from '../../../../Services/team.service';
import { FileService } from '../../../../Services/file.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TeamItem } from '../../../../Models/TeamItem';

@Component({
  selector: 'app-upsert',
  templateUrl: './upsert.component.html',
  styleUrls: ['./upsert.component.css']
})
export class AdminTeamUpsertComponent implements OnInit {
  id: any;
  TeamItem: TeamItem = new TeamItem();
  fileLoading: boolean = false;
  file: any;
  createdAt: any;
  constructor(
    private service: TeamService,
    private fileService: FileService,
    private router: Router,
    private route: ActivatedRoute
  ) { this.id = this.route.snapshot.paramMap.get('id'); }

  ngOnInit(): void {
    if(this.id !== 'create'){
      this.getById(this.id);
      this.getFormForUpdate(this.id);
    }
    else{
      this.getForm();
    }
  }
  getForm(){
    this.service.GetForm().subscribe(resp => {
      console.log(resp.data);
      this.TeamItem = resp.data
    })
  }
  getFormForUpdate(id:string){
    this.service.GetForUpdate(id).subscribe(resp=>{
      this.TeamItem = resp.data;
    })
  }
  getById(id: string){
    this.service.GetById(id).subscribe(resp=>{
      this.TeamItem = resp.data;
    })
  }
  chooseFile(event: any) {
    this.fileLoading = true;
    const file = event.target.files[0];
    const fd = new FormData();
    fd.append('file', file);
    this.fileService.Create(fd).subscribe((resp: any) => {
      this.TeamItem.image = resp.data;
      this.fileLoading = false;
      this.file = resp.data;
    });
  }

  deleteAddedImage() {
    this.TeamItem.image = null;
    this.file = null;
  }
  handleForm() {
    console.log(this.TeamItem);

    if (this.id === "create") {
      this.service.CreateWithForm(this.TeamItem).subscribe(resp => {
        if (resp.succeeded === true) {
          this.router.navigate(['admin/team'])
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
      this.service.UpdateWithForm(this.TeamItem).subscribe(resp => {
        if (resp.succeeded === true) {
          this.router.navigate(['admin/team'])
        }
      })
    }
  }
}
