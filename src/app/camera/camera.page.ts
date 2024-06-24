import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions, CameraResultType, CameraSource } from '@capacitor/camera';
import { ModalController } from '@ionic/angular';
import { CurrencyInfoModalComponent } from '../currency-info-modal/currency-info-modal.component';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {

  constructor(private modalController: ModalController) { 
  }

  ngOnInit() {
  }

  async openCamera() {
    const image = await Camera.getPhoto({      
      quality:100,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      allowEditing: false
    });

    const base64Image = image.dataUrl;
    if (base64Image) {
      this.processImage(base64Image);
    }
  }

  processImage(image: string) {
    const currencyData = this.getCurrencyDataFromImage(image);
    this.presentCurrencyInfo(currencyData);
  }

  async presentCurrencyInfo(currencyData: any) {
    const modal = await this.modalController.create({
      component: CurrencyInfoModalComponent,
      componentProps: {
        'currencyData': currencyData
      }
    });
    return await modal.present();
  }

  getCurrencyDataFromImage(image: string) {
    return {
      name: 'Example Currency',
      countries: 'Example Country',
      history: 'Example history of the currency'
    };
  }
}
