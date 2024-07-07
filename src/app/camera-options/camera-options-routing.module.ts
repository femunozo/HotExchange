import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CameraOptionsPage } from './camera-options.page';

const routes: Routes = [
  {
    path: '',
    component: CameraOptionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CameraOptionsPageRoutingModule {}
