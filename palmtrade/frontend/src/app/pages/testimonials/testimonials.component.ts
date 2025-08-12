import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [import('@angular/common').then(m => m.CommonModule) as any],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent {
  testimonials = signal<any[]>([]);

  async ngOnInit() {
    const res = await fetch('/api/testimonials');
    this.testimonials.set(await res.json());
  }
}
