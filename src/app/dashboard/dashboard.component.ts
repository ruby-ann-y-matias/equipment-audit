import { Component, AfterViewInit } from '@angular/core';
import { RoleService } from '../services/database/role.service';
import { OfficeService } from '../services/database/office.service';
import { EquipmentService } from '../services/database/equipment.service';

@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements AfterViewInit {
  subtitle: string;
  constructor(private dbServ: OfficeService) {
    this.subtitle = 'This is some text within a card block.';
  }

  testingService() {
    const roleName = 'test';
    const roleId = 'ApkmUPdjK0pNfoUNDf4V';

    const officeName = 'Tuitt Makati';
    const officeLocation = '399 Sen. Gil J. Puyat Ave, Makati, 1200 Metro Manila';
    const officeId = 'bzC8V5M7HjPX7DryAKb2';
    const officeRef = `/offices/${officeId}`;

    const equipmentName = 'bulldozer 3';
    const equipmentSpecs = 'Engine Power - Net SAE J1349/ISO 9249: 452 HP: 337 kW';
    const equipmentId = 'AB8KMyCu7vCJkhn4f5Nb';
    const purchaseDate = 'December 10, 2019';
    const lastAuditedAt = 'April 5, 2021';

    // this.dbServ.addRole({
    //     id: '',
    //     name: roleName,
    //     created_at: null,
    //     updated_at: null
    // });
    // this.dbServ.deleteRole(roleId);
    // this.dbServ.getRole(roleId);
    // this.dbServ.getAllRoles();
    // this.dbServ.updateRole(roleId, {
    //     id: roleId,
    //     name: roleName,
    //     created_at: null,
    //     updated_at: null
    // });

    // this.dbServ.addOffice({
    //     id: '',
    //     name: officeName,
    //     location: officeLocation,
    //     created_at: null,
    //     updated_at: null
    // });
    // this.dbServ.deleteOffice(officeId);
    // this.dbServ.getOffice(officeId);
    // this.dbServ.getAllOffices();
    // this.dbServ.updateOffice(officeId, {
    //     id: officeId,
    //     name: officeName,
    //     location: officeLocation,
    //     created_at: null,
    //     updated_at: null
    // });

    // this.dbServ.addEquipment({
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
    // this.dbServ.deleteEquipment(equipmentId);
    // this.dbServ.getEquipment(equipmentId);
    // this.dbServ.getAllEquipment();
    // this.dbServ.updateEquipment(equipmentId, {
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
  }

  ngAfterViewInit() { }
}
