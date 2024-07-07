import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private nombre = new BehaviorSubject<string>('');
  private cantidad01 = new BehaviorSubject<number | null>(0);
  private total = new BehaviorSubject<number>(0);
  private divisa1 = new BehaviorSubject<string>('');
  private divisa2 = new BehaviorSubject<string>('');

  constructor() {}

  setNombre(nombre: string) {
    this.nombre.next(nombre);
  }

  getNombre(): Observable<string> {
    return this.nombre.asObservable();
  }
  
  setCantidad01(cantidad: number | null) {
    this.cantidad01.next(cantidad);
  }

  getCantidad01(): Observable<number | null> {
    return this.cantidad01.asObservable();
  }

  setTotal(total: number) {
    this.total.next(total);
  }

  getTotal(): Observable<number> {
    return this.total.asObservable();
  }

  setDivisa1(divisa: string) {
    this.divisa1.next(divisa);
  }

  getDivisa1(): Observable<string> {
    return this.divisa1.asObservable();
  }

  setDivisa2(divisa: string) {
    this.divisa2.next(divisa);
  }

  getDivisa2(): Observable<string> {
    return this.divisa2.asObservable();
  }
  
  reset() {
    this.nombre.next('');
    this.cantidad01.next(0);
    this.total.next(0);
    this.divisa1.next('');
    this.divisa2.next('');
  }
}