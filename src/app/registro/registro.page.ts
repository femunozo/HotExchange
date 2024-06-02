import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor(private router: Router, private alertController: AlertController) {}

  async mostrarAlerta() {
    const alert = await this.alertController.create({
      header: 'Ocurrió un error',
      message: 'nombre/password ya existe, intente nuevamente.',
      buttons: ['OK']
    });

    await alert.present();
  }

  navegarALogin() {
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }

}
