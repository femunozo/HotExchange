import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { SharedDataService } from '../shared-data.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  nombre:           string = "";
  cantidad01:       number | null = 0;
  divisa1:          string = '';
  divisa2:          string = '';
  total:            number = 0;
  divisas:          { code: string, name: string }[] = [];
  conversionRates:  { [key: string]: number } = {};

  financialData:    any[] = [];

  constructor(private router: Router, 
              private alertController: AlertController, 
              private sharedData: SharedDataService,
              private http: HttpClient
  ) {}

  ngOnInit() {
    this.sharedData.getNombre().subscribe(nombre => this.nombre = nombre);
    this.fetchFinancialData();
  }

  fetchFinancialData() {
    const apiUrl = 'https://mindicador.cl/api';
    
    this.http.get(apiUrl).subscribe(
      (data: any) => {
        console.log(data);
        this.financialData = data;
        const allowedCurrencies = ['dolar', 'euro', 'bitcoin'];

        this.divisas = allowedCurrencies
        .filter(currency => data[currency] !== undefined)
        .map(currency => ({
          code: currency,
          name: data[currency].nombre
        }));

        this.divisas.push({ code: 'peso_chileno', name: 'Peso Chileno'});

        allowedCurrencies.forEach(currency => {
          if (data[currency] !== undefined) {
            this.conversionRates[data[currency].nombre] = data[currency].valor;
          }
        });

        this.conversionRates['Peso Chileno'] = 1;

        console.log(this.divisas);
        console.log(this.conversionRates);
      },
      (error) => {
        console.error('Error', error);
      }
    );
  }

  async mostrarAlerta() {
    const alert = await this.alertController.create({
      header: 'Historial de transacciones: ',
      message: 'Aún no has hecho transacciones.',
      buttons: ['OK']
    });

    await alert.present();
  }

  navegarATab2() {
    this.sharedData.setCantidad01(this.cantidad01);
    this.sharedData.setTotal(this.total);
    this.router.navigate(['/tabs/tab2']);
  }

  irAlHistorial() {
    this.router.navigate(['/historial']);
  }

  convertir() {
    const rate1 = this.divisa1 === 'Peso Chileno' ? 1 : this.conversionRates[this.divisa1];
    const rate2 = this.divisa2 === 'Peso Chileno' ? 1 : this.conversionRates[this.divisa2];

    if (rate1 && rate2 && this.cantidad01 != null) {
      if (this.divisa1 === 'Peso Chileno') {
        this.total = parseFloat((this.cantidad01 / rate2).toFixed(2));
      } else if (this.divisa2 === 'Peso Chileno') {
        this.total = parseFloat((this.cantidad01 * rate1).toFixed(2));
      } else {
        this.total = parseFloat(((this.cantidad01 / rate1) * rate2).toFixed(2));
      }
      this.sharedData.setTotal(this.total);
    } else {
      this.total = 0;
    }
  }


  clearZero() {
    if (this.cantidad01 === 0) {
      this.cantidad01 = null;
    }
  }

  resetForm() {
    this.sharedData.reset();
    this.nombre = '';
    this.cantidad01 = 0;
    this.divisa1 = '';
    this.divisa2 = '';
    this.total = 0;
  }
}