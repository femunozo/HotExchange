import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  cantidad01: number | null = 0;
  divisa1: string = '';
  divisa2: string = '';
  total: number = 0;

  tasasConversion: { [key: string]: { [key: string]: number } } = {
    'Dólar': { 'Euro': 0.85, 'Yen': 110, 'Peso chileno': 750, 'Soles': 3.7, 'Yuan': 6.5 },
    'Euro': { 'Dólar': 1.18, 'Yen': 129, 'Peso chileno': 880, 'Soles': 4.35, 'Yuan': 7.7 },
  };

  constructor(private router: Router, private alertController: AlertController) {}

  ngOnInit() {}

  async mostrarAlerta() {
    const alert = await this.alertController.create({
      header: 'Historial de transacciones: ',
      message: 'Aun no has hecho transacciones.',
      buttons: ['OK']
    });

    await alert.present();
  }

  navegarATab2() {
    this.router.navigate(['/tabs/tab2']);
  }

  convertir() {
    if (this.cantidad01 !== null && this.divisa1 && this.divisa2) {
      const tasa = this.tasasConversion[this.divisa1][this.divisa2];
      this.total = this.cantidad01 * tasa;
    }
  }

  clearZero() {
    if (this.cantidad01 === 0) {
      this.cantidad01 = null;
    }
  }
}
