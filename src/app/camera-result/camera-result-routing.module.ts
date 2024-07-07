import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CameraResultPage } from './camera-result.page';

const routes: Routes = [
  {
    path: '',
    component: CameraResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CameraResultPageRoutingModule {}
