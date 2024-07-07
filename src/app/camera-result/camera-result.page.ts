import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-camera-result',
  templateUrl: './camera-result.page.html',
  styleUrls: ['./camera-result.page.scss'],
})
export class CameraResultPage implements OnInit {
  titleMain: string | null = null;

  constructor(private router: Router) { }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['titleMain']) {
      this.titleMain = navigation.extras.state['titleMain'];
    }
  }

  volverInicio() {
    this.router.navigate(['/tabs/tab1']);
  }
}
