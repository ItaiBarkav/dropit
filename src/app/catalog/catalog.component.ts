import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [HeaderComponent, MaterialModule, ReactiveFormsModule],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
})
export class CatalogComponent {
  search = new FormControl();

  constructor() {}
}
