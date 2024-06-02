import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  constructor(private router: Router, private alertController: AlertController) {}

  async mostrarAlerta() {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: 'La compra/venta se realizó exitosamente.',
      buttons: ['OK']
    });

    await alert.present();
  }

  navegarATabs() {
    this.router.navigate(['/tabs'])
  }

  navegarATab2() {
    this.router.navigate(['/tabs/tab2'])
  }

  ngOnInit() {
  }

}
