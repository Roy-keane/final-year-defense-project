import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [import('@angular/common').then(m => m.CommonModule) as any],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {}
