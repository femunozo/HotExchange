import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit, OnDestroy {

  nombre:           string = "";
  apellido:         string = "";
  nivelInversor:    string = "";
  fechaNacimiento:  string = "";
  usuarioRecibido:  string = "";
  datosGuardados:   boolean = false;

  constructor(private router: Router, private activateroute:ActivatedRoute) {
    this.activateroute.queryParams.subscribe (params => {
      if (this.router.getCurrentNavigation()?.extras?.state) {
        this.usuarioRecibido = this.router.getCurrentNavigation()?.extras?.state?.['usuarioEnviado'];
      }
    });
   }

  ngOnInit() {   
    this.cargarDatos();
  }
  
  ngOnDestroy() {
    if (!this.datosGuardados) {
      this.limpiarDatosDelFormulario();
    }
  }
  
  cargarDatos() {
    this.nombre = localStorage.getItem('nombre') || "";
    this.apellido = localStorage.getItem('apellido') || "";
    this.nivelInversor = localStorage.getItem('nivelInversor') || "";
    this.fechaNacimiento = localStorage.getItem('fechaNacimiento') || "";
  }

  guardarDatos() {
    localStorage.setItem('nombre', this.nombre);
    localStorage.setItem('apellido', this.apellido);
    localStorage.setItem('nivelInversor', this.nivelInversor);
    localStorage.setItem('fechaNacimiento', this.fechaNacimiento);
    this.datosGuardados = true;

    console.log('Formulario guardado');
    console.log('Nombre: ', this.nombre);
    console.log('Apellido: ', this.apellido);
    console.log('Nivel de inversor: ', this.nivelInversor);
    console.log('Fecha de nacimiento: ', this.fechaNacimiento);
  }

  limpiarDatos() {   
    this.limpiarDatosDelFormulario();
    localStorage.removeItem('nombre');
    localStorage.removeItem('apellido');
    localStorage.removeItem('nivelInversor');
    localStorage.removeItem('fechaNacimiento');
    this.datosGuardados = false;
  }

  limpiarDatosDelFormulario() {   
    this.nombre = "";
    this.apellido = "";
    this.nivelInversor = "";
    this.fechaNacimiento = "";
  }

  navegarATab1() {
    this.router.navigate(['/tabs/tab1']);
  }
}