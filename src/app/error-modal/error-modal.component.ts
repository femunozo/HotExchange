import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-error-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Divisa No Encontrada</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <p>Divisa no corresponde a las que trabaja esta Apicación.</p>
      <ion-button expand="block" (click)="close()">Aceptar</ion-button>
    </ion-content>
  `
})
export class ErrorModalComponent {
  constructor(private modalController: ModalController) {}
  async close() {
    await this.modalController.dismiss();
  }
}
