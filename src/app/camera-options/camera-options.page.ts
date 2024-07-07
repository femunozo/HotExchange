import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

@Component({
  selector: 'app-camera-options',
  templateUrl: './camera-options.page.html',
  styleUrls: ['./camera-options.page.scss'],
})
export class CameraOptionsPage {

  constructor(private router: Router) { }

  async buscarFoto() {
    const image: Photo = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos
    });
    if (image.dataUrl) {
      this.router.navigate(['/camera-scan'], { state: { image: image.dataUrl } });
    }
  }

  async tomarFoto() {
    const image: Photo = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    if (image.dataUrl) {
      this.router.navigate(['/camera-scan'], { state: { image: image.dataUrl } });
    }
  }

  volverInicio() {
    this.router.navigate(['/tabs/tab1']);
  }
}
