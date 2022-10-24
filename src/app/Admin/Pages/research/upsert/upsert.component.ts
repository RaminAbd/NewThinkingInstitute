import { Component, OnInit } from '@angular/core';
import { ResearchService } from '../../../../Services/research.service';
import { FileService } from '../../../../Services/file.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Research } from '../../../../Models/Research';
import { FormatDate } from '../../../Helpers/DateFormat';

@Component({
  selector: 'app-upsert',
  templateUrl: './upsert.component.html',
  styleUrls: ['./upsert.component.css']
})
export class AdminResearchUpsertComponent implements OnInit {
  id: any;
  fileLoading: boolean = false;
  file: any;
  createdAt: any;
  ResearchForm: Research = new Research();
  constructor(
    private service: ResearchService,
    private fileService: FileService,
    private router: Router,
    private route: ActivatedRoute) { this.id = this.route.snapshot.paramMap.get('id'); }

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
      this.ResearchForm = resp.data;
    })
  }

  getFormForUpdate(id: string) {
    this.service.GetForUpdate(id).subscribe(resp => {
      this.ResearchForm = resp.data;
      this.createdAt = FormatDate.format(this.ResearchForm.createdAt)
    })
  }
  chooseFile(event: any) {
    this.fileLoading = true;
    const file = event.target.files[0];
    const fd = new FormData();
    fd.append('file', file);
    this.fileService.Create(fd).subscribe((resp: any) => {
      this.ResearchForm.file = resp.data;
      this.fileLoading = false;
      this.file = resp.data;
    });
  }

  deleteAddedImage() {
    this.ResearchForm.file = null;
    this.file = null;
  }


  handleForm() {
    this.ResearchForm.createdAt = this.createdAt;
    if (this.id === "create") {
      this.service.Create(this.ResearchForm).subscribe(resp => {
        if (resp.succeeded === true) {
          this.router.navigate(['admin/research'])
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
      this.service.Update(this.ResearchForm).subscribe(resp => {
        if (resp.succeeded === true) {
          this.router.navigate(['admin/research'])
        }
      })
    }
  }
}
