import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ModalController, NavController } from '@ionic/angular';
import { CurrencyInfoModalComponent } from '../currency-info-modal/currency-info-modal.component';
import * as Tesseract from 'tesseract.js';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage {
  imageUrl: string = '';

  constructor(private modalController: ModalController, private navCtrl: NavController) { 
  }

  async takePicture() {
    const image = await Camera.getPhoto({      
      quality:90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    if (image.dataUrl) {
      this.imageUrl = image.dataUrl;
      this.processImage(this.imageUrl);
    }
  }


  async selectPicture() {
    const image = await Camera.getPhoto({      
      quality:90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos
    });

    if (image.dataUrl) {
      this.imageUrl = image.dataUrl;
      this.processImage(this.imageUrl)
    }
  }

  processImage(base64Image: string) {
    Tesseract.recognize(
      base64Image,
      'spa',
      {
        logger: m => console.log(m)
      }
    ).then(({ data: { text } }) => {
      console.log(text);
      const currencyData = this.getCurrencyDataFromText(text);
      this.presentCurrencyInfo(currencyData);
    }).catch((error: any) => console.error(error));
  }

  getCurrencyDataFromText(text: string) {
    let name = 'Dólar';
    let countries = 'Estados Unidos';
    let history = 'La moneda más utilizada en el mundo.';
    
    if (text.includes('USD')) {
      name = 'Dólar Estadounidense';
      countries = 'Estados Unidos';
      history = 'El Dólar Estadounidense es la moneda oficial de los Estados Unidos y sus territorios.';
    } else if (text.includes('EUR')) {
      name = 'Euro';
      countries = 'Zona Euro';
      history = 'El Euro es la moneda oficial de 19 de los 27 estados miembros de la Unión Europea.';
    }
    
    return {
      name,
      countries,
      history
    };
  }

  async presentCurrencyInfo(currencyData: any) {
    const modal = await this.modalController.create({
      component: CurrencyInfoModalComponent,
      componentProps: {
        'currencyData': currencyData
      },
      backdropDismiss: false
    });

    modal.onDidDismiss().then(() => {
      this.navCtrl.navigateRoot('/tabs/tab1');
    });

    return await modal.present();
  }
}
