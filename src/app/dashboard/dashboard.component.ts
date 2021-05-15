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
  subtitle: string;

  foundRoleById: any;
  foundRoleByName: any;

  constructor(
    public auth: AuthService,
    public equipmentService: EquipmentService,
    public officeService: OfficeService,
    public roleService: RoleService
  ) {
    this.subtitle = 'This is some text within a card block.';

    this.foundRoleById = roleService.getRoleById('ApkmUPdjK0pNfoUNDf4V');
    this.foundRoleByName = roleService.findRoleByName('test');
  }

  testingService() {
    const roleName = 'test';
    const roleId = 'ApkmUPdjK0pNfoUNDf4V';
    const roleRef = `/roles/${roleId}`;

    const officeName = 'Tuitt Makati';
    const officeLocation = '399 Sen. Gil J. Puyat Ave, Makati, 1200 Metro Manila';
    const officeId = 'bzC8V5M7HjPX7DryAKb2';
    const officeRef = `/offices/${officeId}`;

    const equipmentName = 'bulldozer 3';
    const equipmentSpecs = 'Engine Power - Net SAE J1349/ISO 9249: 452 HP: 337 kW';
    const equipmentId = 'AB8KMyCu7vCJkhn4f5Nb';
    const purchaseDate = 'December 10, 2019';
    const lastAuditedAt = 'April 5, 2021';

    const userId = 'euVAmYSrRB2v6C2eRIuy';
    const userName = 'raym';
    const userEmail = 'rymatias@alum.up.edu.ph';
    const userPhoto = 'http://placekitten.com/200/300';

    // this.RoleService.addRole({
    //     id: '',
    //     name: roleName,
    //     created_at: null,
    //     updated_at: null
    // });
    // this.RoleService.deleteRole(roleId);
    // this.RoleService.getRoleById(roleId);
    // this.RoleService.updateRole(roleId, {
    //     id: roleId,
    //     name: roleName,
    //     created_at: null,
    //     updated_at: null
    // });

    // this.OfficeService.addOffice({
    //     id: '',
    //     name: officeName,
    //     location: officeLocation,
    //     created_at: null,
    //     updated_at: null
    // });
    // this.OfficeService.deleteOffice(officeId);
    // this.OfficeService.getOfficeById(officeId);
    // this.OfficeService.updateOffice(officeId, {
    //     id: officeId,
    //     name: officeName,
    //     location: officeLocation,
    //     created_at: null,
    //     updated_at: null
    // });

    // this.EquipmentService.addEquipment({
    //   id: '',
    //   name: equipmentName,
    //   specs: equipmentSpecs,
    //   office_name: officeName,
    //   office_ref: officeRef,
    //   purchase_date: purchaseDate,
    //   last_audited_at: lastAuditedAt,
    //   created_at: null,
    //   updated_at: null
    // });
    // this.EquipmentService.deleteEquipment(equipmentId);
    // this.EquipmentService.getEquipmentById(equipmentId);
    // this.EquipmentService.updateEquipment(equipmentId, {
    //   id: equipmentId,
    //   name: equipmentName,
    //   specs: equipmentSpecs,
    //   office_name: officeName,
    //   office_ref: officeRef,
    //   purchase_date: purchaseDate,
    //   last_audited_at: lastAuditedAt,
    //   created_at: null,
    //   updated_at: null
    // });

    // this.UserService.addUser({
    //   id: '',
    //   name: userName,
    //   email: userEmail,
    //   photoURL: userPhoto,
    //   office_name: officeName,
    //   office_ref: officeRef,
    //   role_name: roleName,
    //   role_ref: roleRef,
    //   last_activity_url: '/register',
    //   last_activity_at: null,
    //   created_at: null,
    //   updated_at: null
    // });
    // this.UserService.deleteUser(userId);
    // this.UserService.getUserById(userId);
    // this.UserService.updateUser(userId, {
    //   id: userId,
    //   name: userName,
    //   email: userEmail,
    //   photoURL: userPhoto,
    //   office_name: officeName,
    //   office_ref: officeRef,
    //   role_name: roleName,
    //   role_ref: roleRef,
    //   last_activity_url: '/edit',
    //   last_activity_at: null,
    //   created_at: null,
    //   updated_at: null
    // });
  }

  ngAfterViewInit() { }
}
