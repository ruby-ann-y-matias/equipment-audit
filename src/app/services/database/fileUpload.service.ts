import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, take } from 'rxjs/operators';

import { EquipmentService } from './equipment.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class FileUploadService {
  constructor(
    public auth: AngularFireAuth,
    private storage: AngularFireStorage,
    private equipmentService: EquipmentService,
    private userService: UserService
  ) {
  }

  uploadFile(file: any, docObj: any, docType: string) {
    if (['equipment', 'user'].includes(docType)) {
      const now = Date.now();
      const ref = this.storage.ref(`${docType}/${docObj.id}-${now}`);

      try {
         const task = ref.put(file);
         const taskSub = task.snapshotChanges().pipe(
            finalize(() => {
              const urlSub = ref.getDownloadURL()
                .pipe(take(1))
                .subscribe((val) => {
                  // console.log(val);
                  this.updateDocPhoto(val, docObj, docType);
                  urlSub.unsubscribe();
                });
              taskSub.unsubscribe();
            })
         )
        .subscribe();
      } catch (e) {
        console.log(e);
      }
    }
  }

  updateDocPhoto(url: string, docObj: any, docType: string) {
    switch (docType) {
      case 'equipment':
        docObj.photo_url = url;
        this.equipmentService.updateEquipment(docObj.id, docObj);
        break;
      case 'user':
        docObj.profile_image = url;
        this.userService.updateUser(docObj.id, docObj);
        break;
      default:
        break;
    }
  }
}