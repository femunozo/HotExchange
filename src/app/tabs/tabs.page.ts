import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { AlertController, MenuController } from '@ionic/angular';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { CurrencyService } from '../services/currency.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  currenciesData: { [key: string]: number } = {};
  convertedCurrencies: { [key: string]: number } = {};
  locationDetails: any = {};

  constructor(
    private http: HttpClient,
    private menuController: MenuController,
    private alertController: AlertController,
    private router: Router,
    private currencyService: CurrencyService
  ) {}

  ngOnInit() {
    this.fetchAllCurrencies();
  }

  async openCameraOptions() {
    try {
      await this.menuController.close('firstMenu');
      const alert = await this.alertController.create({
        header: 'Opciones de cámara',
        buttons: [
          {
            text: 'Elegir imagen',
            handler: () => {
              this.chooseImage();
            }
          },
          {
            text: 'Tomar foto',
            handler: () => {
              this.takePhoto();
            }
          },
          {
            text: 'Cancelar',
            role: 'cancel'
          }
        ]
      });
      await alert.present();
    } catch (error) {
      console.error(error);
    }
  }

  async chooseImage() {
    try {
      const image = await Camera.getPhoto({
        quality: 100,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos,
        allowEditing: false
      });

      const base64Image = image.dataUrl;
      if (base64Image) {
        this.router.navigate(['/camera-scan'], {
          state: { image: base64Image }
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 100,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        allowEditing: false
      });

      const base64Image = image.dataUrl;
      if (base64Image) {
        this.router.navigate(['/camera-scan'], {
          state: { image: base64Image }
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async geolocation() {
    try {
      await this.menuController.close('firstMenu');
      const coordinates = await Geolocation.getCurrentPosition();
      const lat = coordinates.coords.latitude;
      const lng = coordinates.coords.longitude;
      this.findNearestBank(lat, lng);
    } catch (error) {
      console.error(error);
    }
  }

  findNearestBank(lat: number, lng: number) {
    this.locationDetails = {
      name: 'Banco simulado',
      distance: 1.2,
      address: 'Dirección simulada'
    };
    this.router.navigate(['/geolocation-result'], {
      state: { locationDetails: this.locationDetails }
    });
  }

  fetchAllCurrencies(): void {
    const url = 'https://v6.exchangerate-api.com/v6/9f5ee2f6f724f1f627572a41/latest/USD';
    this.http.get(url).pipe(
      catchError(this.handleError)
    ).subscribe(
      (data: any) => {
        if (data && data.conversion_rates) {
          this.currenciesData = data.conversion_rates;
          this.convertCurrenciesToCLP();
        } else {
          console.error('Error: Datos de divisas no válidos');
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Error al obtener los datos de todas las divisas:', error);
      }
    );
  }

  convertCurrenciesToCLP() {
    const clpValue = this.currenciesData['CLP'];
    if (clpValue) {
      for (const [currency, rate] of Object.entries(this.currenciesData)) {
        if (typeof rate === 'number') {
          this.convertedCurrencies[currency] = rate * (clpValue / (rate * rate));
        }
      }
    } else {
      console.error('Error: No se encontró el valor de CLP en los datos de divisas');
    }
  }

  private handleError(error: any) {
    console.error('Ocurrió un error:', error);
    return throwError(() => new Error('Algo salió mal, por favor, intente nuevamente.'));
  }

  isNumber(value: any): value is number {
    return typeof value === 'number' && !isNaN(value);
  }
}
