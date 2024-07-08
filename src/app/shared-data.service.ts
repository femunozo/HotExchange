import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { BehaviorSubject, Observable } from 'rxjs';
=======
import { BehaviorSubject } from 'rxjs';
>>>>>>> f520401b931e804657690899b4d34873a81595cb

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
<<<<<<< HEAD

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
  
=======
  private nombre = new BehaviorSubject<string>('');
  private cantidad01 = new BehaviorSubject<number | null>(0);
  private total = new BehaviorSubject<number>(0);

  setCantidad01(value: number | null) {
    this.cantidad01.next(value);
  }

  getCantidad01() {
    return this.cantidad01.asObservable();
  }

  setTotal(value: number) {
    this.total.next(value);
  }

  getTotal() {
    return this.total.asObservable();
  }

  setNombre(value: string) {
    this.nombre.next(value);
  }

  getNombre() {
    return this.nombre.asObservable();
  }

>>>>>>> f520401b931e804657690899b4d34873a81595cb
  reset() {
    this.nombre.next('');
    this.cantidad01.next(0);
    this.total.next(0);
<<<<<<< HEAD
    this.divisa1.next('');
    this.divisa2.next('');
=======
>>>>>>> f520401b931e804657690899b4d34873a81595cb
  }
}