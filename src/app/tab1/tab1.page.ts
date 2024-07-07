import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { SharedDataService } from '../shared-data.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { CurrencyService } from '../services/currency.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit, OnDestroy {

  nombre: string = '';
  cantidad01: string = '';
  divisa1: string = '';
  divisa2: string = '';
  total: number = 0;
  currenciesData: any;
  divisas: { code: string, name: string }[] = [];
  conversionRates: { [key: string]: number } = {};
  subscription: Subscription | undefined;

  constructor(private router: Router, 
              private alertController: AlertController, 
              private sharedData: SharedDataService,
              private http: HttpClient,
              private currencyService: CurrencyService
  ) {}

  ngOnInit() {
    this.sharedData.getNombre().subscribe(nombre => this.nombre = nombre);
    this.fetchAllCurrencies();
    this.initializeCurrencyField();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  fetchAllCurrencies() {
    const url = 'https://v6.exchangerate-api.com/v6/9f5ee2f6f724f1f627572a41/latest/USD';
    this.http.get(url).pipe(
      catchError(this.handleError)
    ).subscribe(
      (data: any) => {
        try {
          if (typeof data === 'object') {
            this.currenciesData = data.conversion_rates;
            this.conversionRates = data.conversion_rates;
            this.divisas = this.getCurrenciesWithNames(data.conversion_rates).sort((a, b) => a.name.localeCompare(b.name));
            console.log('Datos de todas las divisas:', this.currenciesData);
          } else {
            throw new Error('La respuesta no es un objeto JSON válido');
          }
        } catch (error) {
          console.error('Error al procesar los datos de la API:', error);
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Error al obtener los datos de todas las divisas:', error);
      }
    );
  }
  

  private getCurrenciesWithNames(conversionRates: { [key: string]: number }): { code: string, name: string }[] {
    const currencyNames: { [key: string]: string } = {
    "AED": "Dírham de los Emiratos Árabes Unidos",
    "AFN": "Afgani afgano",
    "ALL": "Lek albanés",
    "AMD": "Dram armenio",
    "ANG": "Florín de las Antillas Neerlandesas",
    "AOA": "Kwanza angoleño",
    "ARS": "Peso argentino",
    "AUD": "Dólar australiano",
    "AWG": "Florín arubeño",
    "AZN": "Manat azerbaiyano",
    "BAM": "Marco convertible bosnioherzegovino",
    "BBD": "Dólar barbadense",
    "BDT": "Taka bangladesí",
    "BGN": "Lev búlgaro",
    "BHD": "Dinar bareiní",
    "BIF": "Franco burundés",
    "BMD": "Dólar bermudeño",
    "BND": "Dólar de Brunéi",
    "BOB": "Boliviano",
    "BRL": "Real brasileño",
    "BSD": "Dólar bahameño",
    "BTN": "Ngultrum butanés",
    "BWP": "Pula botsuano",
    "BYN": "Rublo bielorruso",
    "BZD": "Dólar beliceño",
    "CAD": "Dólar canadiense",
    "CDF": "Franco congoleño",
    "CHF": "Franco suizo",
    "CLP": "Peso chileno",
    "CNY": "Yuan chino",
    "COP": "Peso colombiano",
    "CRC": "Colón costarricense",
    "CUP": "Peso cubano",
    "CVE": "Escudo caboverdiano",
    "CZK": "Corona checa",
    "DJF": "Franco yibutiano",
    "DKK": "Corona danesa",
    "DOP": "Peso dominicano",
    "DZD": "Dinar argelino",
    "EGP": "Libra egipcia",
    "ERN": "Nakfa eritreo",
    "ETB": "Birr etíope",
    "EUR": "Euro",
    "FJD": "Dólar fiyiano",
    "FKP": "Libra malvinense",
    "FOK": "Corona feroesa",
    "GBP": "Libra esterlina",
    "GEL": "Lari georgiano",
    "GGP": "Libra de Guernsey",
    "GHS": "Cedi ghanés",
    "GIP": "Libra gibraltareña",
    "GMD": "Dalasi gambiano",
    "GNF": "Franco guineano",
    "GTQ": "Quetzal guatemalteco",
    "GYD": "Dólar guyanés",
    "HKD": "Dólar de Hong Kong",
    "HNL": "Lempira hondureño",
    "HRK": "Kuna croata",
    "HTG": "Gourde haitiano",
    "HUF": "Forinto húngaro",
    "IDR": "Rupia indonesia",
    "ILS": "Nuevo shéquel israelí",
    "IMP": "Libra manesa",
    "INR": "Rupia india",
    "IQD": "Dinar iraquí",
    "IRR": "Rial iraní",
    "ISK": "Corona islandesa",
    "JEP": "Libra de Jersey",
    "JMD": "Dólar jamaicano",
    "JOD": "Dinar jordano",
    "JPY": "Yen japonés",
    "KES": "Chelín keniano",
    "KGS": "Som kirguís",
    "KHR": "Riel camboyano",
    "KID": "Dólar de Kiribati",
    "KMF": "Franco comorense",
    "KRW": "Won surcoreano",
    "KWD": "Dinar kuwaití",
    "KYD": "Dólar caimano",
    "KZT": "Tenge kazajo",
    "LAK": "Kip laosiano",
    "LBP": "Libra libanesa",
    "LKR": "Rupia de Sri Lanka",
    "LRD": "Dólar liberiano",
    "LSL": "Loti lesotense",
    "LYD": "Dinar libio",
    "MAD": "Dírham marroquí",
    "MDL": "Leu moldavo",
    "MGA": "Ariary malgache",
    "MKD": "Denar macedonio",
    "MMK": "Kyat birmano",
    "MNT": "Tugrik mongol",
    "MOP": "Pataca macaense",
    "MRU": "Ouguiya mauritana",
    "MUR": "Rupia mauriciana",
    "MVR": "Rufiyaa maldiva",
    "MWK": "Kwacha malauí",
    "MXN": "Peso mexicano",
    "MYR": "Ringgit malayo",
    "MZN": "Metical mozambiqueño",
    "NAD": "Dólar namibio",
    "NGN": "Naira nigeriano",
    "NIO": "Córdoba nicaragüense",
    "NOK": "Corona noruega",
    "NPR": "Rupia nepalí",
    "NZD": "Dólar neozelandés",
    "OMR": "Rial omaní",
    "PAB": "Balboa panameño",
    "PEN": "Sol peruano",
    "PGK": "Kina de Papúa Nueva Guinea",
    "PHP": "Peso filipino",
    "PKR": "Rupia pakistaní",
    "PLN": "Zloty polaco",
    "PYG": "Guaraní paraguayo",
    "QAR": "Rial catarí",
    "RON": "Leu rumano",
    "RSD": "Dinar serbio",
    "RUB": "Rublo ruso",
    "RWF": "Franco ruandés",
    "SAR": "Rial saudí",
    "SBD": "Dólar salomonense",
    "SCR": "Rupia seychellense",
    "SDG": "Libra sudanesa",
    "SEK": "Corona sueca",
    "SGD": "Dólar singapurense",
    "SHP": "Libra de Santa Elena",
    "SLE": "Leona sierraleonés",
    "SLL": "Leone sierraleonés",
    "SOS": "Chelín somalí",
    "SRD": "Dólar surinamés",
    "SSP": "Libra sursudanesa",
    "STN": "Dobra santotomense",
    "SYP": "Libra siria",
    "SZL": "Lilangeni suazi",
    "THB": "Baht tailandés",
    "TJS": "Somoni tayiko",
    "TMT": "Manat turcomano",
    "TND": "Dinar tunecino",
    "TOP": "Paʻanga tongano",
    "TRY": "Lira turca",
    "TTD": "Dólar de Trinidad y Tobago",
    "TVD": "Dólar tuvaluano",
    "TWD": "Nuevo dólar taiwanés",
    "TZS": "Chelín tanzano",
    "UAH": "Grivna ucraniana",
    "UGX": "Chelín ugandés",
    "USD": "Dólar estadounidense",
    "UYU": "Peso uruguayo",
    "UZS": "Som uzbeko",
    "VES": "Bolívar venezolano",
    "VND": "Dong vietnamita",
    "VUV": "Vatu vanuatuense",
    "WST": "Tala samoano",
    "XAF": "Franco CFA de África Central",
    "XCD": "Dólar del Caribe Oriental",
    "XDR": "Derechos especiales de giro",
    "XOF": "Franco CFA de África Occidental",
    "XPF": "Franco CFP",
    "YER": "Rial yemení",
    "ZAR": "Rand sudafricano",
    "ZMW": "Kwacha zambiano",
    "ZWL": "Dólar zimbabuense"
    };
    return Object.keys(conversionRates).map(code => ({
      code,
      name: currencyNames[code] || code
    })).sort((a, b) => a.name.localeCompare(b.name));
  }

  private handleError(error: any) {
    console.error('Ocurrió un error:', error);
    return throwError(() => new Error('Algo salió mal, por favor, intente nuevamente.'));
  }

  convertir() {
    const rateFrom = this.conversionRates[this.divisa1];
    const rateTo = this.conversionRates[this.divisa2];
    const amount = parseFloat(this.cantidad01.replace(/[$,]/g, ''));
    if (rateFrom && rateTo && !isNaN(amount)) {
      if (this.divisa1 !== this.divisa2) {
        this.total = parseFloat(((amount * rateTo) / rateFrom).toFixed(2));
      } else {
        this.total = amount;
      }
      this.sharedData.setTotal(this.total);
    } else {
      this.total = 0;
    }
  }

  clearZero() {
    if (this.cantidad01 === '$0') {
      this.cantidad01 = '';
    }
  }

  formatCurrency(event: any) {
    const value = event.target.value.replace(/[^0-9.]/g, '');
    if (value) {
      this.cantidad01 = '$' + value;
    } else {
      this.cantidad01 = '';
    }
  }

  initializeCurrencyField() {
    this.cantidad01 = '$0';
  }

  resetForm() {
    this.sharedData.reset();
    this.nombre = '';
    this.cantidad01 = '$0';
    this.divisa1 = '';
    this.divisa2 = '';
    this.total = 0;
  }

  navegarATab2() {
    const amount = parseFloat(this.cantidad01.replace(/[$,]/g, ''));
    this.sharedData.setCantidad01(amount);
    this.sharedData.setDivisa1(this.divisa1);
    this.sharedData.setDivisa2(this.divisa2);
    this.sharedData.setTotal(this.total);
    this.router.navigate(['/tabs/tab2']);
  }

  irAlHistorial() {
    this.router.navigate(['/historial']);
  }

  async mostrarAlerta() {
    const alert = await this.alertController.create({
      header: 'Historial de transacciones: ',
      message: 'Aún no has hecho transacciones.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
