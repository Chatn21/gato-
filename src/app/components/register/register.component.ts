import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // <-- Importamos Router
import { AuthService } from '../../../services/auth.service';
import { RouterModule} from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router // <-- Inyectamos Router
  ) {}

  async onRegister() {
    try {
      await this.authService.register(this.email, this.password);
      alert('Usuario registrado correctamente');

      // Redirigir al login automáticamente
      this.router.navigate(['/login']);
    } catch (error: any) {
      alert('Error al registrar: ' + error.message);
    }
  }
}
