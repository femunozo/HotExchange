import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeolocationResultPage } from './geolocation-result.page';

const routes: Routes = [
  {
    path: '',
    component: GeolocationResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeolocationResultPageRoutingModule {}
