import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from '../material.module';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  productsInCart = 0;

  constructor(private cartService: CartService, private router: Router) {
    this.updateProductsInCart();
  }

  goToCart(): void {
    this.router.navigateByUrl('cart');
  }

  private updateProductsInCart(): void {
    this.cartService
      .numberOfProducts()
      .subscribe((a) => (this.productsInCart = a));
  }
}
