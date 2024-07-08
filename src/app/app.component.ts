import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages = [
    { item_id: 1, title: 'Camara', url: '/camera', icon: 'camera-outline' },
    { item_id: 2, title: 'Geolocalización', url: '/maps', icon: 'locate-outline' }
  ];

  constructor(private navController: NavController) {}

  onMenuItemClick(id: number) {
    if (id === 1) {
      this.navController.navigateRoot('/camera');
    } else if (id === 2) {
        this.navController.navigateRoot('/maps');
    }
  }
}
