import { Component, AfterViewInit } from '@angular/core';
import { DatabaseService } from '../services/database/database.service';

@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements AfterViewInit {
  subtitle: string;
  constructor(private dbServ: DatabaseService) {
    this.subtitle = 'This is some text within a card block.';
  }

  testingService(name: any) {
    // const id = 'oWemurXW2Wc3iLaDdCvR';
    // this.dbServ.addRole(name);
    // this.dbServ.deleteRole(id);
    // this.dbServ.getRole(id);
    this.dbServ.getAllRoles();
    // this.dbServ.updateRole(id, { name: 'test' });
  }


  ngAfterViewInit() { }
}
