import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [import('@angular/forms').then(m => m.FormsModule) as any],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  name = signal('');
  email = signal('');
  password = signal('');
  role = signal<'customer'|'seller'|'supplier'>('customer');
  error = signal('');

  constructor(private router: Router) {}

  async register() {
    this.error.set('');
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: this.name(), email: this.email(), password: this.password(), role: this.role() })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      this.router.navigateByUrl('/');
    } catch (e: any) {
      this.error.set(e.message);
    }
  }
}
