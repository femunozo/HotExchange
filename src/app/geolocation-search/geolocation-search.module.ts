import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeolocationSearchPageRoutingModule } from './geolocation-search-routing.module';

import { GeolocationSearchPage } from './geolocation-search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeolocationSearchPageRoutingModule
  ],
  declarations: [GeolocationSearchPage]
})
export class GeolocationSearchPageModule {}
