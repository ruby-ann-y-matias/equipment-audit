import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EquipmentService } from 'src/app/services/database/equipment.service';

@Component({
  selector: 'app-equipment-details',
  templateUrl: './equipment-details.component.html',
  styleUrls: ['./equipment-details.component.scss']
})
export class EquipmentDetailsComponent implements OnInit {

  id: any;
  equipmentDetails : any;
  constructor(
    private activatedRoute : ActivatedRoute,
    private equipmentService: EquipmentService
  ) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => { 
      this.id = params.get('id'); 
    });
    this.equipmentService.getEquipmentById(this.id).subscribe((res)=>{
      this.equipmentDetails = res;

      console.log(this.equipmentDetails)
    })
  }






}
