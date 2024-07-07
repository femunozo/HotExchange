import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CurrencyService } from './services/currency.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  public appPages = [
    { item_id: 1, title: 'Geolocalización', url: '/geolocation-search', icon: 'locate-outline' },
    { item_id: 2, title: 'Historia de divisas', url: '/wiki-search', icon: 'search-outline' }
  ];

  public currencies: { [key: string]: number } = {};
  public dollarToCLP: number = 0;
  public convertedCurrencies: { [key: string]: number } = {};

  constructor(
    private navController: NavController,
    private router: Router,
    private menuController: MenuController,
    private currencyService: CurrencyService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadCurrencies();
  }

  async onMenuItemClick(id: number) {
    if (id === 1) {
      await this.router.navigate(['/geolocation-search']);
    } else if (id === 2) {
      await this.router.navigate(['/wiki-search']);
    }
    this.menuController.close('firstMenu');
  }

  async loadCurrencies() {
    try {
      const url = 'https://v6.exchangerate-api.com/v6/9f5ee2f6f724f1f627572a41/latest/USD';
      const data: any = await this.http.get(url).pipe(
        catchError(this.handleError)
      ).toPromise();

      if (data && data.conversion_rates) {
        this.currencies = data.conversion_rates;
        const clpValue = this.currencies['CLP'];
        if (clpValue) {
          for (const [currency, rate] of Object.entries(this.currencies)) {
            if (typeof rate === 'number') {
              this.convertedCurrencies[currency] = rate * (clpValue / (rate * rate));
            }
          }
        }
      }
    } catch (error) {
      console.error('Error loading currencies:', error);
    }
  }

  private handleError(error: any) {
    console.error('Ocurrió un error:', error);
    return throwError(() => new Error('Algo salió mal, por favor, intente nuevamente.'));
  }

  isNumber(value: any): boolean {
    return typeof value === 'number' && !isNaN(value);
  }
}
