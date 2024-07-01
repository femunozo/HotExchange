import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
    private dollarUrl = '/api/Serie.aspx?gcode=PRE_TCO&param=RABmAFYAWQB3AGYAaQBuAEkALQAzADUAbgBNAGgAaAAkADUAVwBQAC4AbQBYADAARwBOAGUAYwBjACMAQQBaAHAARgBhAGcAUABTAGUAdwA1ADQAMQA0AE0AawBLAF8AdQBDACQASABzAG0AXwA2AHQAawBvAFcAZwBKAEwAegBzAF8AbgBMAHIAYgBDAC4ARQA3AFUAVwB4AFIAWQBhAEEAOABkAHkAZwAxAEEARAA=';
    private allCurrenciesUrl = '/api/ListaSerie.aspx?param=VQB3AE4ASwBDAHcAagBRACMALQBHAGEAUQBtAGkAaQBaAGEAbgA3AEwAdgAkAHIAcwBCAHkAVgB6AFYAbwB6AGwAXwBiAFcATgBSAFMAOABFAHQAaAAxADkAdQAtAHkANQAtAGIARQBaAF8A';

  constructor(private http: HttpClient) { }

  getDollarData(): Observable<any> {
    return this.http.get(this.dollarUrl).pipe(
      map(response => this.parseResponse(response))
    );
  }

  getAllCurrencies(): Observable<any> {
    return this.http.get(this.allCurrenciesUrl).pipe(
      map(response => this.parseResponse(response))
    );
  }

  private parseResponse(response: any): any {
    console.log('Raw API Response:', response);
    if (typeof response === 'string') {
      try {
        return JSON.parse(response);
      } catch (error) {
        console.error('Error parsing JSON response:', error);
        return null;
      }
    }
    return response;
  }
}
