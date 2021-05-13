import { Component, AfterViewInit } from '@angular/core';
import { RoleService } from '../services/database/role.service';
import { OfficeService } from '../services/database/office.service';
import { EquipmentService } from '../services/database/equipment.service';

@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements AfterViewInit {
  subtitle: string;
  constructor(private dbServ: EquipmentService) {
    this.subtitle = 'This is some text within a card block.';
  }

  testingService() {
    const roleName = 'test';
    const roleId = 'Xf16qCOsJxKHI14EH4dH';

    const officeName = 'Tuitt Makati';
    const officeLocation = '399 Sen. Gil J. Puyat Ave, Makati, 1200 Metro Manila';
    const officeId = 'BVlZcWLoB93Ts4EbyH2T';
    const officeRef = `/offices/${officeId}`;

    const equipmentName = 'bulldozer 3';
    const equipmentSpecs = 'Engine Power - Net SAE J1349/ISO 9249: 452 HP: 337 kW';
    const equipmentId = 'AB8KMyCu7vCJkhn4f5Nb';
    const purchaseDate = 'December 10, 2019';
    const lastAuditedAt = 'April 5, 2021';

    // this.dbServ.addRole(roleName);
    // this.dbServ.deleteRole(roleId);
    // this.dbServ.getRole(id);
    // this.dbServ.getAllRoles();
    // this.dbServ.updateRole(roleId, { name });

    // this.dbServ.addOffice(officeName, officeLocation);
    // this.dbServ.deleteOffice(officeId);
    // this.dbServ.getOffice(officeId);
    // this.dbServ.getAllOffices();
    // this.dbServ.updateOffice(officeId, { name, officeLocation });

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
