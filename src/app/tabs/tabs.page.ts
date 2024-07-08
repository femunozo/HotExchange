import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { ModalController } from '@ionic/angular';
import { CurrencyInfoModalComponent } from '../currency-info-modal/currency-info-modal.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() { 
  }

  async openCamera() {
    const image = await Camera.getPhoto({
      quality: 100,
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

  async getGeolocation() {
    const coordinates = await Geolocation.getCurrentPosition();
    const lat = coordinates.coords.latitude;
    const lng = coordinates.coords.longitude;
    this.findNearestBank(lat, lng);
  }

  findNearestBank(lat: number, lng: number) {
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
      name: 'Dólar',
      countries: 'Estados Unidos',
      history: 'El dólar estadounidense es la moneda oficial de los Estados Unidos y sus territorios.'
    };
  }
}
