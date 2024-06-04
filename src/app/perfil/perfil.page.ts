import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  nombre:  string ="";
  apellido:  string ="";
  nivelInversor:  string ="";
  fechaNacimiento:  string ="";
  usuarioRecibido:  string ="";

  constructor(private router: Router, private activateroute:ActivatedRoute) {
    this.activateroute.queryParams.subscribe (params => {
      if(this.router.getCurrentNavigation()?.extras?.state){
        this.usuarioRecibido = this.router.getCurrentNavigation()?.extras?.state?.['usuarioEnviado'];
      }
    })
   }

  ngOnInit() {}

  
  onSubmit() {
    console.log('Formulario guardado');
    console.log('Nombre, this.nombre');
    console.log('Apellido, this.apellido');
    console.log('Nivel de inversor, this.nivelInversor');
    console.log('Fecha de nacimiento, this.fechaNacimiento');

  }

  navegarATab1() {
    this.router.navigate(['/tabs/tab1']);
  }

}