import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD';
  private googleTranslateApiUrl = 'https://translation.googleapis.com/language/translate/v2';
  private googleTranslateApiKey = 'AIzaSyAZeAgbvat5bwYJPNG6gciOQHOTf3uZp_E';

  constructor(private http: HttpClient) { }

  getSupportedCurrencyCodes(): string[] {
    return ['AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 
      'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 
      'BRL', 'BSD', 'BTN', 'BWP', 'BYN', 'BZD', 'CAD', 'CDF', 'CHF', 'CLP', 
      'CNY', 'COP', 'CRC', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 
      'EGP', 'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'FOK', 'GBP', 'GEL', 'GGP', 
      'GHS', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 
      'HUF', 'IDR', 'ILS', 'IMP', 'INR', 'IQD', 'IRR', 'ISK', 'JEP', 'JMD', 
      'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KID', 'KMF', 'KRW', 'KWD', 'KYD', 
      'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LYD', 'MAD', 'MDL', 'MGA', 
      'MKD', 'MMK', 'MNT', 'MOP', 'MRU', 'MUR', 'MVR', 'MWK', 'MXN', 'MYR', 
      'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN', 
      'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 
      'SAR', 'SBD', 'SCR', 'SDG', 'SEK', 'SGD', 'SHP', 'SLE', 'SLL', 'SOS', 
      'SRD', 'SSP', 'STN', 'SYP', 'SZL', 'THB', 'TJS', 'TMT', 'TND', 'TOP', 
      'TRY', 'TTD', 'TVD', 'TWD', 'TZS', 'UAH', 'UGX', 'USD', 'UYU', 'UZS', 
      'VES', 'VND', 'VUV', 'WST', 'XAF', 'XCD', 'XDR', 'XOF', 'XPF', 'YER', 
      'ZAR', 'ZMW', 'ZWL'];
  }

  getCurrencyInfo(currencyCode: string): Observable<any> {
    const apiKey = '9f5ee2f6f724f1f627572a41';
    const currencyInfoUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/USD/${currencyCode}`;
    return this.http.get(currencyInfoUrl);
  }

  getCountryInfo(currencyCode: string): Observable<any> {
    const countryInfoUrl = `https://restcountries.com/v3.1/currency/${currencyCode}`;
    return this.http.get(countryInfoUrl);
  }

  translateToSpanish(text: string): Observable<any> {
    const translateUrl = `${this.googleTranslateApiUrl}?key=${this.googleTranslateApiKey}`;
    return this.http.post(translateUrl, {
      q: text,
      target: 'es'
    });
  }

  getWikipediaInfo(currencyCode: string): Observable<any> {
    const wikipediaUrl = `https://es.wikipedia.org/api/rest_v1/page/summary/${currencyCode}`;
    return this.http.get(wikipediaUrl);
  }
}
