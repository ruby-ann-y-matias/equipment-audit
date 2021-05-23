import { Component, AfterViewInit } from '@angular/core';

import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Equipment, EquipmentService } from '../services/database/equipment.service';
import { Office, OfficeService } from '../services/database/office.service';
import { Role, RoleService } from '../services/database/role.service';
// import { UserService } from '../services/database/user.service';

@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements AfterViewInit {


  foundRoleById: any;
  foundRoleByName: any;

  constructor(
    public auth: AuthService,
    public equipmentService: EquipmentService,
    public officeService: OfficeService,
    public roleService: RoleService
  ) {

  }


  ngAfterViewInit() { }
}
