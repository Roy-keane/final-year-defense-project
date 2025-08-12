import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [import('@angular/common').then(m => m.CommonModule) as any],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent {
  reviews = signal<any[]>([]);

  async ngOnInit() {
    const res = await fetch('/api/reviews');
    this.reviews.set(await res.json());
  }
}
