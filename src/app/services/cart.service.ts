import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Checkout } from '../types/checkout';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _products$ = new BehaviorSubject<Map<Product, number>>(new Map());
  private _numberOfProducts$ = new BehaviorSubject(0);
  private _price$ = new BehaviorSubject(0);

  constructor(private httpClient: HttpClient) {}

  get products$(): Observable<Map<Product, number>> {
    return this._products$.asObservable();
  }

  get numberOfProducts$(): Observable<number> {
    return this._numberOfProducts$.asObservable();
  }

  get price$(): Observable<number> {
    return this._price$.asObservable();
  }

  add(product: Product): void {
    const productCount = this._products$.value.get(product) ?? 0;
    this._products$.value.set(product, productCount + 1);

    this._numberOfProducts$.next(this._numberOfProducts$.value + 1);
    this._price$.next(this._price$.value + product.price);
  }

  removeAll(product: Product): void {
    const quantity = this._products$.value.get(product);
    this._products$.value.delete(product);

    this._numberOfProducts$.next(this._numberOfProducts$.value - quantity!);
    this._price$.next(this._price$.value - product.price * quantity!);
  }

  remove(product: Product): void {
    this._products$.value.delete(product);

    this._numberOfProducts$.next(this._numberOfProducts$.value - 1);
    this._price$.next(this._price$.value - product.price!);
  }

  updateQuantity(product: Product, quantity: number): void {
    const productQuantity = this._products$.value.get(product);

    this._numberOfProducts$.next(
      this._numberOfProducts$.value - productQuantity! + quantity
    );
    this._price$.next(
      this._price$.value -
        product.price * productQuantity! +
        product.price * quantity
    );

    this._products$.value.set(product, quantity);
  }

  submit(): void {
    let checkout: Checkout = {
      items: [],
    };

    this._products$.value.forEach((quantity, { id }) =>
      checkout.items.push({ productId: id, quantity })
    );

    this.httpClient
      .post(
        'https://private-anon-7fed260f5a-droptask.apiary-mock.com/checkout',
        checkout
      )
      .subscribe();
  }
}
