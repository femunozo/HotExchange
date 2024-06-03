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

  constructor(private router: Router, private alertController: AlertController, private http: HttpClient) {
    this.validatePasswordMatch = this.validatePasswordMatch.bind(this);
  }

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

  validatePasswordMatch() {
    const passwordMismatchError = this.password !== this.repitepass ? { 'passwordMismatch': true } : null;
    const repitepassInput = (document.querySelector('[name="repitepass"]') as any).ngModel;
    if (repitepassInput && repitepassInput.control) {
      repitepassInput.control.setErrors(passwordMismatchError);
    }
  }

  crearCuenta(form: any) {
    if (this.password !== this.repitepass) {
      this.mostrarAlerta('Las contraseñas no coinciden. Por favor, revisa y vuelve a intentarlo.');
      return;
    }
  
    if (form.valid && !form.controls.repitepass.errors?.['passwordMismatch']) {
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
          this.mostrarAlerta('Usuario/password ya están en uso, intente nuevamente.');
        }
      );
    } else {
      this.mostrarAlerta('Formulario inválido. Por favor, revise los campos.');
    }
  }
}