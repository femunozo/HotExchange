import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navegarATab1() {
    this.router.navigate(['/tabs/tab1'])
  }
}