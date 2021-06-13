import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EquipmentService } from 'src/app/services/database/equipment.service';
import { FileUploadService } from 'src/app/services/database/fileUpload.service';

import {
  NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels
} from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-equipment-details',
  templateUrl: './equipment-details.component.html',
  styleUrls: ['./equipment-details.component.scss']
})
export class EquipmentDetailsComponent implements OnInit {
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.LOW;
  value = window.location.origin;
  id: any;
  equipmentDetails : any;
  constructor(
    private activatedRoute : ActivatedRoute,
    private equipmentService: EquipmentService,
    private fileUploadService: FileUploadService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.equipmentService.getEquipmentById(this.id).subscribe((res)=>{
      this.equipmentDetails = res;
      this.value = `${this.value}/equipments/${this.id}`;

      console.log(this.equipmentDetails)
    })
  }

  handleInputFile() {
    const inputFile = document.querySelector('#inputFile') as HTMLInputElement;
    if (inputFile) inputFile.click();
  }

  handleUploadFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fileUploadService.uploadFile(file, this.equipmentDetails, 'equipment');
    }
  }
}
