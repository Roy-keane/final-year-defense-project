import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [import('@angular/forms').then(m => m.FormsModule) as any],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = signal('');
  password = signal('');
  error = signal('');

  constructor(private router: Router) {}

  async login() {
    this.error.set('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: this.email(), password: this.password() })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      this.router.navigateByUrl('/');
    } catch (e: any) {
      this.error.set(e.message);
    }
  }
}
