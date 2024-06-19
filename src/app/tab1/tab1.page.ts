import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  nombre:     string = "";
  cantidad01: number | null = 0;
  divisa1:    string = '';
  divisa2:    string = '';
  total:      number = 0;

  tasasConversion: { [key: string]: { [key: string]: number } } = {
    'Dólar': { 'Euro': 0.85, 'Yen': 110, 'Peso chileno': 750, 'Soles': 3.7, 'Yuan': 6.5 },
    'Euro': { 'Dólar': 1.18, 'Yen': 129, 'Peso chileno': 880, 'Soles': 4.35, 'Yuan': 7.7 },
    'Yen': { 'Dólar': 0.0091, 'Euro': 0.0078, 'Peso chileno': 6.8, 'Soles': 0.034, 'Yuan': 0.059 },
    'Peso chileno': { 'Dólar': 0.0013, 'Euro': 0.0011, 'Yen': 0.15, 'Soles': 0.0051, 'Yuan': 0.0086 },
    'Soles': { 'Dólar': 0.27, 'Euro': 0.23, 'Yen': 29.4, 'Peso chileno': 195.2, 'Yuan': 1.82 },
    'Yuan': { 'Dólar': 0.15, 'Euro': 0.13, 'Yen': 17, 'Peso chileno': 116, 'Soles': 0.55 }
  };

  constructor(private router: Router, private alertController: AlertController, private sharedData: SharedDataService) {}

  ngOnInit() {
    this.sharedData.getNombre().subscribe(nombre => this.nombre = nombre);
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
  const tasa = this.tasasConversion[this.divisa1][this.divisa2];
  if (tasa && this.cantidad01 != null) {
    this.total = parseFloat((this.cantidad01 * tasa).toFixed(1));
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
    this.cantidad01 = 0;
    this.divisa1 = '';
    this.divisa2 = '';
    this.total = 0;
  }
}