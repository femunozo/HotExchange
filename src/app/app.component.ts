import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages = [
    { item_id: 1, title: 'Camara', url: '/camera', icon: 'camera-outline' },
  ];
  constructor() {}

  onMenuItemClick(id:any)
  {
    if( (id==3) && (localStorage.getItem('sesión_activa')=='SI'))
    {
        localStorage.clear();
    }
  }
}
