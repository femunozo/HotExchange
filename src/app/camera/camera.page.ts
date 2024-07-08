import { Component, OnInit, OnDestroy } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { SharedImageService } from '../services/shared-image.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit, OnDestroy {
  imageUrl: string = '';
  imageSubscription: Subscription | null = null;

  constructor(
    private router: Router,
    private actionSheetController: ActionSheetController,
    private sharedImageService: SharedImageService
  ) {}

  ngOnInit() {
    this.imageSubscription = this.sharedImageService.getImageUrl().subscribe(url => {
      this.imageUrl = url;
    });
  }

  ngOnDestroy() {
    if (this.imageSubscription) {
      this.imageSubscription.unsubscribe();
    }
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Seleccione una opción',
      buttons: [
        {
          text: 'Buscar imagen en dispositivo',
          handler: () => {
            this.selectPicture();
          }
        },
        {
          text: 'Tomar foto',
          handler: () => {
            this.takePicture();
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    if (image.dataUrl) {
      this.sharedImageService.setImageUrl(image.dataUrl);
    }
  }

  async selectPicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos
    });

    if (image.dataUrl) {
      this.sharedImageService.setImageUrl(image.dataUrl);
    }
  }

  deleteImage() {
    this.sharedImageService.clearImageUrl();
  }

  goToHome() {
    this.router.navigate(['/tabs/tab1']);
  }
}
