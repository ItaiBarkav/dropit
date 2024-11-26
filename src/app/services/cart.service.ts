import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Checkout } from '../types/checkout';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly PRODUCTS = 'products';

  private _products$ = new BehaviorSubject<Map<Product, number>>(
    new Map(JSON.parse(localStorage.getItem(this.PRODUCTS)!))
  );
  private _numberOfProducts$ = new BehaviorSubject(0);
  private _price$ = new BehaviorSubject(0);

  constructor(private httpClient: HttpClient) {
    this.productsSubscription();
  }

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
    this._products$.next(this._products$.value.set(product, productCount + 1));
  }

  removeAll(product: Product): void {
    this._products$.value.delete(product);
    this._products$.next(this._products$.value);
  }

  remove(product: Product): void {
    this._products$.value.delete(product);
    this._products$.next(this._products$.value);
  }

  updateQuantity(product: Product, quantity: number): void {
    this._products$.next(this._products$.value.set(product, quantity));
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

  reset(): void {
    this._products$.next(new Map());
  }

  private productsSubscription(): void {
    this._products$.subscribe((products) => {
      this._numberOfProducts$.next(
        Array.from(products.values()).reduce((acc, value) => acc + value, 0)
      );

      this._price$.next(
        Array.from(products.entries()).reduce(
          (total, [{ price }, quantity]) => total + price * quantity,
          0
        )
      );

      localStorage.setItem(this.PRODUCTS, JSON.stringify([...products]));
    });
  }
}
