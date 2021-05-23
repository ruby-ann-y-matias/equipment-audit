import { Component, OnInit } from '@angular/core';
import { EquipmentService } from 'src/app/services/database/equipment.service';

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.scss']
})
export class EquipmentsComponent implements OnInit {

  constructor(
    public equipmentService: EquipmentService
    ) { }

  ngOnInit(): void {
  }

}
