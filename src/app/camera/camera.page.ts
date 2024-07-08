<<<<<<< HEAD
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { SharedImageService } from '../services/shared-image.service';
import { Subscription } from 'rxjs';
=======
import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ModalController, NavController } from '@ionic/angular';
import { CurrencyInfoModalComponent } from '../currency-info-modal/currency-info-modal.component';
import * as Tesseract from 'tesseract.js';
>>>>>>> f520401b931e804657690899b4d34873a81595cb

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
<<<<<<< HEAD
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
=======
export class CameraPage {
  imageUrl: string = '';

  constructor(private modalController: ModalController, private navCtrl: NavController) { 
  }

  async takePicture() {
    const image = await Camera.getPhoto({      
      quality:90,
>>>>>>> f520401b931e804657690899b4d34873a81595cb
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    if (image.dataUrl) {
<<<<<<< HEAD
      this.sharedImageService.setImageUrl(image.dataUrl);
    }
  }

  async selectPicture() {
    const image = await Camera.getPhoto({
      quality: 90,
=======
      this.imageUrl = image.dataUrl;
      this.processImage(this.imageUrl);
    }
  }


  async selectPicture() {
    const image = await Camera.getPhoto({      
      quality:90,
>>>>>>> f520401b931e804657690899b4d34873a81595cb
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos
    });

    if (image.dataUrl) {
<<<<<<< HEAD
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
=======
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
    let name = 'Dolar';
    let countries = 'Estados Unidos';
    let history = 'La moneda más utilizada en el mundo.';
    
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
      },
      backdropDismiss: false
    });

    modal.onDidDismiss().then(() => {
      this.navCtrl.navigateRoot('/tabs/tab1');
    });

    return await modal.present();
  }
}
>>>>>>> f520401b931e804657690899b4d34873a81595cb
