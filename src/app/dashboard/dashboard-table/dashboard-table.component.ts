import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-table',
  templateUrl: './dashboard-table.component.html',
  styleUrls: ['./dashboard-table.component.scss']
})
export class DashboardTableComponent implements OnInit {

  @Input() role: any;
  @Input() office: any;
  @Input() equipment: any;


  // pagination purposes later on
  page: any = 1;
  pageSize: any = 10;

  constructor() { }

  ngOnInit(): void {

  }

}
