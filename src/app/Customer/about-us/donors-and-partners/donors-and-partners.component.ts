import { Component, OnInit } from '@angular/core';
import { PartnersService } from '../../../Services/partners.service';
import { Partner } from '../../../Models/Partner';

@Component({
  selector: 'app-donors-and-partners',
  templateUrl: './donors-and-partners.component.html',
  styleUrls: ['./donors-and-partners.component.css']
})
export class DonorsAndPartnersComponent implements OnInit {

  constructor(private service:PartnersService) { }
  Partners:Partner[] = [];
  ngOnInit(): void {
    this.GetAll()
  }
  GetAll(){
    this.service.GetAll().subscribe(resp=>{
      this.Partners = resp.data;

    })
  }
}
