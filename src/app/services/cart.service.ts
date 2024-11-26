import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _products$ = new BehaviorSubject<Map<Product, number>>(new Map());
  private _numberOfProducts$ = new BehaviorSubject(0);

  constructor() {}

  add(product: Product): void {
    if (!this._products$.value.has(product)) {
      this._numberOfProducts$.next(this._numberOfProducts$.value + 1);
    }

    const productCount = this._products$.value.get(product) ?? 0;
    this._products$.value.set(product, productCount + 1);
  }

  numberOfProducts(): Observable<number> {
    return this._numberOfProducts$.asObservable();
  }
}
