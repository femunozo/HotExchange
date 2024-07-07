import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CurrencyService } from '../services/currency.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-camera-scan',
  templateUrl: './camera-scan.page.html',
  styleUrls: ['./camera-scan.page.scss'],
})
export class CameraScanPage implements OnInit {
  scanning = false;
  imageUrl: string | null = null;

  constructor(
    private router: Router,
    private currencyService: CurrencyService,
    private alertController: AlertController,
    private http: HttpClient
  ) { }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['image']) {
      this.imageUrl = navigation.extras.state['image'] || null;
      if (this.imageUrl) {
        this.scanImage(this.imageUrl);
      }
    }
  }

  async scanImage(image: string) {
    this.scanning = true;
    try {
      const text = await this.recognizeImage(image);
      const currencyCode = this.extractCurrencyCode(text);
      if (currencyCode) {
        const currencyInfo = await this.currencyService.getCurrencyInfo(currencyCode).toPromise();
        const titleMain = currencyInfo.name;
        this.router.navigate(['/camera-result'], {
          state: { titleMain }
        });
      } else {
        this.showErrorMessage();
      }
    } catch (error) {
      console.error('Error al escanear la imagen:', error);
      this.showErrorMessage();
    } finally {
      this.scanning = false;
    }
  }

  async recognizeImage(image: string): Promise<string> {
    const url = `https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAZeAgbvat5bwYJPNG6gciOQHOTf3uZp_E`;
    const body = {
      requests: [
        {
          image: {
            content: image.split(',')[1]
          },
          features: [
            {
              type: 'TEXT_DETECTION'
            }
          ]
        }
      ]
    };
    const response: any = await this.http.post(url, body).toPromise();
    return response.responses[0].fullTextAnnotation.text;
  }

  extractCurrencyCode(text: string): string | null {
    const supportedCurrencies = this.currencyService.getSupportedCurrencyCodes();
    for (const currencyCode of supportedCurrencies) {
      if (text.includes(currencyCode)) {
        return currencyCode;
      }
    }
    return null;
  }

  async showErrorMessage() {
    const alert = await this.alertController.create({
      header: 'Divisa no encontrada',
      message: 'Divisa no encontrada entre las divisas de esta aplicación.',
      buttons: [
        {
          text: 'Volver a inicio',
          handler: () => {
            this.router.navigate(['/tabs/tab1']);
          }
        }
      ]
    });
    await alert.present();
  }
}
