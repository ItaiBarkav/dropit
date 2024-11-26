import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { MaterialModule } from '../material.module';
import { CartService } from '../services/cart.service';
import { ProductsService } from '../services/products.service';
import { Product } from '../types/product';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [HeaderComponent, MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
})
export class CatalogComponent {
  searchTerm = new FormControl();
  products: Product[] = [];

  private originProducts$ = new BehaviorSubject<Product[]>([]);

  constructor(
    private productsService: ProductsService,
    private cartService: CartService
  ) {
    this.initOriginProducts();
    this.search();
  }

  addToCart(product: Product): void {
    this.cartService.add(product);
  }

  private initOriginProducts(): void {
    this.productsService.getProducts().subscribe((products) => {
      this.originProducts$.next(products);
      this.products = products;
    });
  }

  private search(): void {
    this.searchTerm.valueChanges.subscribe(
      (searchTerm) =>
        (this.products = this.originProducts$.value.filter(
          (products) =>
            products.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            products.id.toString().includes(searchTerm)
        ))
    );
  }
}
