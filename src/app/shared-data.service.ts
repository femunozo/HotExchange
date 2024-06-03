import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private cantidad01Subject = new BehaviorSubject<number | null>(0);
  private totalSubject = new BehaviorSubject<number>(0);

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

  reset() {
    this.cantidad01Subject.next(0);
    this.totalSubject.next(0);
  }
}

