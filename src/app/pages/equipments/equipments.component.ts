import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EquipmentService } from 'src/app/services/database/equipment.service';

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.scss']
})
export class EquipmentsComponent implements OnInit {

  constructor(
    public equipmentService: EquipmentService,
    public router : Router
    ) { }

  ngOnInit(): void {
  }




  goToDetailedEquipmentPage(id: any){
    this.router.navigate(['/equipments/'+id]);
  }
}
