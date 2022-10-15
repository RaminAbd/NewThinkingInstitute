import { Component, OnInit } from '@angular/core';
import { CustomerRequestService } from '../../../Services/customer-request.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class AdminRequestsComponent implements OnInit {

  constructor(private service:CustomerRequestService) { }

  ngOnInit(): void {
    this.getAllrequests(1);
  }
  getAllrequests(index: number){
    this.service.GetAllWithPaging(index).subscribe(resp=>{
      console.log(resp);
    })
  }
}
