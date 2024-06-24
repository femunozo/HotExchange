import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-currency-info-modal',
  templateUrl: './currency-info-modal.component.html',
  styleUrls: ['./currency-info-modal.component.scss'],
})
export class CurrencyInfoModalComponent {
  @Input() currencyData: any;

  constructor(private modalController: ModalController) {}

  dismissModal() {
    this.modalController.dismiss();
  }

  ngOnInit() {
  }

}
