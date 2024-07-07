import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeolocationResultPageRoutingModule } from './geolocation-result-routing.module';

import { GeolocationResultPage } from './geolocation-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeolocationResultPageRoutingModule
  ],
  declarations: [GeolocationResultPage]
})
export class GeolocationResultPageModule {}
