import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  constructor(private router:Router) { }

  navegarAPerfil() {
    this.router.navigate(['/perfil']);
  }

  ngOnInit() {
  }

  navegarALogin() {
    let navigationExtras: NavigationExtras = {
      state: {
        limpiarCampos: true
      }
    };
    this.router.navigate(['/login'], navigationExtras)
  }
}



