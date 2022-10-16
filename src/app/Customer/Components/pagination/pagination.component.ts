import { Component, OnInit, Input , Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() Response:any;
  @Output() Changes = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  GetAllWithPaging(e:any){
    this.Changes.emit(e);
  }
}
