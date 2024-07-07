import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeolocationSearchPage } from './geolocation-search.page';

const routes: Routes = [
  {
    path: '',
    component: GeolocationSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeolocationSearchPageRoutingModule {}
