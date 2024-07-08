import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { SharedDataService } from '../shared-data.service';
<<<<<<< HEAD
import { SharedImageService } from '../services/shared-image.service';
=======
>>>>>>> f520401b931e804657690899b4d34873a81595cb

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
<<<<<<< HEAD
  nombre: string = "";
  cantidad01: number | null = 0;
  total: number = 0;
  divisa1: string = '';
  divisa2: string = '';
  imageUrl: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private sharedData: SharedDataService,
    private sharedImageService: SharedImageService
  ) {}
=======

  nombre:     string = "";
  cantidad01: number | null = 0;
  total:      number = 0;

  constructor(private router: Router, private alertController: AlertController, private sharedData: SharedDataService) {}
>>>>>>> f520401b931e804657690899b4d34873a81595cb

  ngOnInit() {
    this.sharedData.getNombre().subscribe(nombre => this.nombre = nombre);
    this.sharedData.getCantidad01().subscribe(value => {
      this.cantidad01 = value;
    });
    this.sharedData.getTotal().subscribe(value => {
      this.total = value;
    });
<<<<<<< HEAD
    this.sharedData.getDivisa1().subscribe(value => {
      this.divisa1 = value;
    });
    this.sharedData.getDivisa2().subscribe(value => {
      this.divisa2 = value;
    });
    this.sharedImageService.getImageUrl().subscribe(url => this.imageUrl = url);
  }

  redireccionar() {
    window.location.href = 'https://www.bancoestado.cl/bancoestado/simulaciones/comercio/simule_1.asp';
  }

  navegarATabs() {
    this.router.navigate(['/tabs']);
  }

  navegarATab2() {
    this.router.navigate(['/tabs/tab2']);
  }

  editProfilePic() {
    this.router.navigate(['/camera']);
=======
  }

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
>>>>>>> f520401b931e804657690899b4d34873a81595cb
  }
}
