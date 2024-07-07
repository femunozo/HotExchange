import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NominatimService } from '../services/nominatim.service';

@Component({
  selector: 'app-geolocation-search',
  templateUrl: './geolocation-search.page.html',
  styleUrls: ['./geolocation-search.page.scss'],
})
export class GeolocationSearchPage implements OnInit {
  location: { lat: number; lng: number } | null = null;
  exchangeOfficeName: string | null = null;
  distance: number | null = null;

  constructor(private navCtrl: NavController, private nominatimService: NominatimService) {}

  ngOnInit() {
    this.startSearch();
  }

  async startSearch() {
    try {
      const coordinates = await this.nominatimService.getCurrentLocation();
      this.location = {
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude,
      };

      if (this.location) {
        this.nominatimService.getCityFromLocation(this.location.lat, this.location.lng).subscribe((cityResponse: any) => {
          const city = cityResponse.address.city || cityResponse.address.town || cityResponse.address.village;
          console.log('Ciudad:', city);

          if (this.location) {
            const lat = this.location.lat;
            const lng = this.location.lng;
            this.nominatimService.findNearestCurrencyExchange(lat, lng, city).subscribe((response: any) => {
              console.log('API Response:', response);

              if (response.length > 0) {
                response.sort((a: any, b: any) => {
                  const distA = this.nominatimService.calculateDistance(lat, lng, parseFloat(a.lat), parseFloat(a.lon));
                  const distB = this.nominatimService.calculateDistance(lat, lng, parseFloat(b.lat), parseFloat(b.lon));
                  return distA - distB;
                });

                const nearestExchangeOffice = response[0];
                this.exchangeOfficeName = nearestExchangeOffice.display_name;
                const exchangeOfficeLocation = {
                  lat: parseFloat(nearestExchangeOffice.lat),
                  lng: parseFloat(nearestExchangeOffice.lon),
                };

                this.distance = this.nominatimService.calculateDistance(lat, lng, exchangeOfficeLocation.lat, exchangeOfficeLocation.lng);

                console.log('Casa de cambio más cercana:', this.exchangeOfficeName);
                console.log('Distancia:', this.distance);
              } else {
                console.log('No se encontraron casas de cambio cercanas');
                this.exchangeOfficeName = 'No se encontraron casas de cambio cercanas';
                this.distance = null;
              }
            }, (error: any) => {
              console.log('Error en la solicitud a Nominatim:', error);
            });
          }
        }, (error: any) => {
          console.log('Error obteniendo la ciudad:', error);
        });
      }
    } catch (error) {
      console.log('Error obteniendo la ubicación:', error);
    }
  }

  goToHome() {
    this.navCtrl.navigateRoot('/tabs/tab1');
  }
}
