import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
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

  reset() {
    this.nombre.next('');
    this.cantidad01.next(0);
    this.total.next(0);
  }
}