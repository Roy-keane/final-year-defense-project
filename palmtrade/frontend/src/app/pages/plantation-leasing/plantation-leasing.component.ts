import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-plantation-leasing',
  standalone: true,
  imports: [import('@angular/common').then(m => m.CommonModule) as any],
  templateUrl: './plantation-leasing.component.html',
  styleUrls: ['./plantation-leasing.component.scss']
})
export class PlantationLeasingComponent {
  leases = signal<any[]>([]);

  async ngOnInit() {
    const res = await fetch('/api/leases');
    this.leases.set(await res.json());
  }
}
