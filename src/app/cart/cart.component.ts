import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { CheckoutDialogComponent } from '../checkout-dialog/checkout-dialog.component';
import { HeaderComponent } from '../header/header.component';
import { MaterialModule } from '../material.module';
import { QuantityComponent } from '../quantity/quantity.component';
import { CartService } from '../services/cart.service';
import { Product } from '../types/product';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MaterialModule, HeaderComponent, CommonModule, QuantityComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  products$ = this.cartService.products$;
  price = 0;

  constructor(
    private cartService: CartService,
    private router: Router,
    private matDialog: MatDialog
  ) {
    this.updatePrice();
  }

  removeAllFromCart(product: Product): void {
    this.cartService.removeAll(product);
  }

  updateQuantity(quantity: number, product: Product): void {
    this.cartService.updateQuantity(product, quantity);
  }

  openDialog(): void {
    this.cartService.submit();

    const checkoutDialogRef = this.matDialog.open(CheckoutDialogComponent);
    checkoutDialogRef
      .afterClosed()
      .pipe(map(() => this.router.navigateByUrl('/')))
      .subscribe();
  }

  private updatePrice(): void {
    this.cartService.price$.subscribe((price) => (this.price = price));
  }
}
