import { Component, AfterViewInit } from '@angular/core';
import { RoleService } from '../services/database/role.service';

@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements AfterViewInit {
  subtitle: string;
  constructor(private dbServ: RoleService) {
    this.subtitle = 'This is some text within a card block.';
  }

  testingService(name: string) {
    // const id = 'Xf16qCOsJxKHI14EH4dH';
    // this.dbServ.addRole(name);
    // this.dbServ.deleteRole(id);
    // this.dbServ.getRole(id);
    this.dbServ.getAllRoles();
    // this.dbServ.updateRole(id, { name });
  }


  ngAfterViewInit() { }
}
