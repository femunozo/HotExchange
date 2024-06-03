import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  usuario: string = "";
  password: string = "";
  repitepass: string = "";

  constructor(private router: Router, private alertController: AlertController, private http: HttpClient) {}

  async mostrarAlerta(message: string = 'nombre/password ya existe, intente nuevamente.') {
    const alert = await this.alertController.create({
      header: 'Ocurrió un error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  navegarALogin() {
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }

  crearCuenta(form: any) {
    if (form.valid) {
      const usuarioData = {
        usuario: this.usuario,
        password: this.password
      };

      this.http.post('https://tu-api.com/crear-cuenta', usuarioData).subscribe(
        response => {
          console.log('Cuenta creada exitosamente:', response);
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Error al crear la cuenta:', error);
          this.mostrarAlerta('No se pudo crear la cuenta. Intente nuevamente.');
        }
      );
    } else {
      this.mostrarAlerta('Formulario inválido. Por favor, revise los campos.');
    }
  }
}