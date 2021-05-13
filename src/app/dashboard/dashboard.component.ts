import { Component, AfterViewInit } from '@angular/core';
import { RoleService } from '../services/database/role.service';
import { OfficeService } from '../services/database/office.service';

@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements AfterViewInit {
  subtitle: string;
  constructor(private dbServ: OfficeService) {
    this.subtitle = 'This is some text within a card block.';
  }

  testingService() {
    // const name = 'test name';
    // const location = 'test location';
    // const roleId = 'Xf16qCOsJxKHI14EH4dH';
    // this.dbServ.addRole(name);
    // this.dbServ.deleteRole(roleId);
    // this.dbServ.getRole(id);
    // this.dbServ.getAllRoles();
    // this.dbServ.updateRole(roleId, { name });

    // const name = 'Tuitt Makati';
    // const location = '399 Sen. Gil J. Puyat Ave, Makati, 1200 Metro Manila';
    // const officeId = 'BVlZcWLoB93Ts4EbyH2T';
    // this.dbServ.addOffice(name, location);
    // this.dbServ.deleteOffice(officeId);
    // this.dbServ.getOffice(officeId);
    // this.dbServ.getAllOffices();
    // this.dbServ.updateOffice(officeId, { name, location });
  }

  ngAfterViewInit() { }
}
