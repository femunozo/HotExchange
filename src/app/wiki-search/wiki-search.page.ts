import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyService } from '../services/currency.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-wiki-search',
  templateUrl: './wiki-search.page.html',
  styleUrls: ['./wiki-search.page.scss'],
})
export class WikiSearchPage {
  currencyCode: string = '';
  currencyInfo: any = null;

  constructor(private currencyService: CurrencyService, private router: Router, private alertController: AlertController) {}

  searchCurrency() {
    const formattedCurrencyCode = this.currencyCode.toUpperCase();
    const supportedCurrencies = this.currencyService.getSupportedCurrencyCodes();

    if (supportedCurrencies.includes(formattedCurrencyCode)) {
      this.currencyService.getWikipediaInfo(formattedCurrencyCode).subscribe(
        (data) => {
          this.currencyInfo = data;
        },
        (error) => {
          console.error('Error fetching data from Wikipedia:', error);
        }
      );
    } else {
      this.currencyInfo = null;
      this.showErrorMessage();
    }
  }

  async showErrorMessage() {
    const alert = await this.alertController.create({
      header: 'Divisa no encontrada',
      message: 'La sigla ingresada no corresponde a una divisa de la aplicación.',
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  volverInicio() {
    this.router.navigate(['/tabs/tab1']);
  }
}
