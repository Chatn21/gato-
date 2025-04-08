import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService) {}

  async onLogin() {
    try {
      await this.authService.login(this.email, this.password);
      alert('Inicio de sesión exitoso');
    } catch (error: any) {
      alert('Error al iniciar sesión: ' + error.message);
    }
  }
}
