import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [import('@angular/common').then(m => m.CommonModule) as any],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products = signal<any[]>([]);

  async ngOnInit() {
    const res = await fetch('/api/products');
    const data = await res.json();
    this.products.set(data);
  }
}
