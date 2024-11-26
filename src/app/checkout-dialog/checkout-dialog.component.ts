import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-checkout-dialog',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './checkout-dialog.component.html',
  styleUrl: './checkout-dialog.component.scss',
})
export class CheckoutDialogComponent {
  constructor(private mMatDialogRef: MatDialogRef<CheckoutDialogComponent>) {}

  close(): void {
    this.mMatDialogRef.close();
  }
}
