import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
<<<<<<< HEAD
=======
import { AlertController } from '@ionic/angular';
>>>>>>> f520401b931e804657690899b4d34873a81595cb

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {
  nearestBank: string = 'TU BANCO MÁS CERCANO AQUÍ';
  distanceToNearestBank: number = 0;

  private bancos = [
    { name: 'Banco Estado', latitude: 40.712776, longitude: -74.005974 },
    { name: 'Banco Itaú', latitude: 34.052235, longitude: -118.243683 },
    { name: 'Banco Bice', latitude: 41.878113, longitude: -87.629799 },
  ];

  constructor() {
  }

  ngOnInit() {
  }

  async getGeolocation() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      const lat = coordinates.coords.latitude;
      const lng = coordinates.coords.longitude;
      this.findNearestBank(lat, lng);
    } catch (error) {
      console.error('Error obteniendo la geolocalización', error);
      this.nearestBank = 'Error obteniendo la geolocalización';
      this.distanceToNearestBank = 0;
    }
  }

  findNearestBank(lat: number, lng: number) {
    let nearestBank = null;
    let minDistance = Infinity;

    for (const bank of this.bancos) {
      const distance = this.getDistanceFromLatLonInKm(lat, lng, bank.latitude, bank.longitude);
      if (distance < minDistance) {
        minDistance = distance;
        nearestBank = bank.name;
        this.distanceToNearestBank = distance;
      }
    }

    this.nearestBank = nearestBank ? nearestBank : 'No se han encontrado bancos cerca de su ubicación';
  }

  getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  }

  deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}
