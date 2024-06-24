import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions, CameraResultType, CameraSource } from '@capacitor/camera';
import { ModalController } from '@ionic/angular';
import { CurrencyInfoModalComponent } from '../currency-info-modal/currency-info-modal.component';
import * as Tesseract from 'tesseract.js';

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
      source: CameraSource.Prompt,
      allowEditing: false
    });

    const base64Image = image.dataUrl;
    if (base64Image) {
      this.processImage(base64Image);
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
    let name = 'Ejemplo de Moneda';
    let countries = 'Ejemplo de País';
    let history = 'Historia de ejemplo de la moneda.';
    
    if (text.includes('USD')) {
      name = 'Dólar Estadounidense';
      countries = 'Estados Unidos';
      history = 'El dólar estadounidense es la moneda oficial de los Estados Unidos y sus territorios.';
    } else if (text.includes('EUR')) {
      name = 'Euro';
      countries = 'Zona Euro';
      history = 'El euro es la moneda oficial de 19 de los 27 estados miembros de la Unión Europea.';
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
      }
    });
    return await modal.present();
  }
}
