import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { ModalController } from '@ionic/angular';
import { CurrencyInfoModalComponent } from '../currency-info-modal/currency-info-modal.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  currenciesData:       any;
  dollarData:           any;

  constructor(private modalController: ModalController,
              private http: HttpClient) { }

  ngOnInit() { 
    this.fetchAllCurrencies();
    this.fetchDollarData();
  }

  async openCamera() {
    try {
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
    } catch (error) {
      console.error('Error al abrir la cámara:', error)
    }
  }

  processImage(image: string) {
    const currencyData = this.getCurrencyDataFromImage(image);
    this.presentCurrencyInfo(currencyData);
  }

  async getGeolocation() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      const lat = coordinates.coords.latitude;
      const lng = coordinates.coords.longitude;
      this.findNearestBank(lat, lng);
    } catch (error) {
      console.error('Error al obtener la geolocalización:', error)
    }
  }

  findNearestBank(lat: number, lng: number) {
    //Aquí debo agregar la lógica necesaria para encontrar el banco o casa de cambio más cercano
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

  fetchAllCurrencies() {
    const url = 'https://v6.exchangerate-api.com/v6/9f5ee2f6f724f1f627572a41/latest/USD';
    this.http.get(url).pipe(
      catchError(this.handleError)
    ).subscribe(
      (data: any) => {
        this.currenciesData = data.conversion_rates;
        console.log('Datos de todas las divisas:', this.currenciesData);
      },
      (error: HttpErrorResponse) => {
        console.error('Error al obtener los datos de todas las divisas:', error);
      }
    );
  }

  fetchDollarData() {
    const url = 'https://v6.exchangerate-api.com/v6/9f5ee2f6f724f1f627572a41/pair/USD/CLP';
    this.http.get(url).pipe(
      catchError(this.handleError)
    ).subscribe(
      (data: any) => {
        this.dollarData = data.conversion_rate;
        console.log('Datos del Dólar:', this.dollarData);
      },
      (error: HttpErrorResponse) => {
        console.error('Error al obtener los datos del Dólar:', error);
      }
    );
  }

  private handleError(error: any ) {
    console.error('Ocurrió un error:', error);
    return throwError(() => new Error('Algo salió mal, por favor, intente nuevamente.'));
  }
}
