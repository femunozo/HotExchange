import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private cantidad01Subject = new BehaviorSubject<number | null>(0);
  private totalSubject = new BehaviorSubject<number>(0);
  private nombreSubject = new BehaviorSubject<string>(localStorage.getItem('nombre') || '');

  constructor() { }

  setCantidad01(value: number | null) {
    this.cantidad01Subject.next(value);
  }

  getCantidad01() {
    return this.cantidad01Subject.asObservable();
  }

  setTotal(value: number) {
    this.totalSubject.next(value);
  }

  getTotal() {
    return this.totalSubject.asObservable();
  }

  setNombre(value: string) {
    this.nombreSubject.next(value);
    localStorage.setItem('nombre', value);
  }

  getNombre() {
    return this.nombreSubject.asObservable();
  }

  reset() {
    this.cantidad01Subject.next(0);
    this.totalSubject.next(0);
    this.nombreSubject.next('');
    localStorage.removeItem('nombre');
  }
}