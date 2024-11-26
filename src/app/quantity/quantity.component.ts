import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-quantity',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './quantity.component.html',
  styleUrl: './quantity.component.scss',
})
export class QuantityComponent {
  @Input() quantity = 0;
  @Output() update = new EventEmitter<number>();

  increment(): void {
    this.quantity++;
    this.emitQuantity();
  }

  decrement(): void {
    if (this.quantity === 0) {
      return;
    }

    this.quantity--;
    this.emitQuantity();
  }

  private emitQuantity(): void {
    this.update.emit(this.quantity);
  }
}
