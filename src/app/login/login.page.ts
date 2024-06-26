import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario:  string ="";
  password: string ="";

  constructor(private alertController: AlertController, private router:Router) { }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state && navigation.extras.state['limpiarCampos']) {
      this.usuario = "";
      this.password = "";
    }
  }

  navegarATabs() {
    this.router.navigate(['/tabs']);
  }

  navegarAPerfil() {
    let NavigationExtras: NavigationExtras = {
      state:{
        usuarioEnviado: this.usuario
      }
    }
    this.router.navigate(['/perfil'], NavigationExtras);
  }

  login() {
    if (this.usuario.trim() === 'felipe' && this.password.trim() === '1234') {
      let navigationExtras = {
        state: {
          usuarioEnviado:   this.usuario,
          passwordEnviado:  this.password
        }
      };
      this.router.navigate(['../tabs/tab1'], navigationExtras);
    } else {
      this.presentAlert('usuario/password incorrecta');
    }
  }

  navegarARegistro() {
    this.router.navigate(['/registro']);
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: message,
      buttons: ['Ok']
    });

    await alert.present();
  }
}