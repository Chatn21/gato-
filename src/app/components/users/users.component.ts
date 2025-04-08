import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth, User } from '@angular/fire/auth';
import { RouterModule} from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = null;
  passwordForUpdate: string = '';
  emailVerified: boolean = false;

  constructor(
    public authService: AuthService,
    public auth: Auth
  ) {}

  async ngOnInit() {
    this.loadUsers();
  }

  async loadUsers() {
    this.users = await this.authService.getUsers();
  }

  editUser(user: any) {
    this.selectedUser = { ...user };
    this.emailVerified = this.auth.currentUser?.emailVerified || false;
  }

  // Verificar correo
  async verifyEmail() {
    const currentUser = this.auth.currentUser as User;
    if (currentUser) {
      try {
        await this.authService.sendVerificationEmail(currentUser);
        alert('Correo de verificación enviado. Revisa tu bandeja de entrada para continuar.');
      } catch (error: any) {
        alert(`Error al enviar correo de verificación: ${error.message}`);
      }
    }
  }

  // Cambiar correo
  async updateUser() {
    if (this.selectedUser) {
      const currentUser = this.auth.currentUser as User;

      if (this.emailVerified) {
        try {
          // Actualizar el correo electrónico
          await this.authService.updateUserEmail(currentUser, this.selectedUser.email, this.passwordForUpdate);

          alert('Correo electrónico actualizado. Por favor, verifica tu nuevo correo.');
          this.selectedUser = null;
          this.loadUsers();
        } catch (error: any) {
          alert(`Error actualizando usuario: ${error.message}`);
        }
      } else {
        alert('Debes verificar tu correo electrónico antes de poder cambiarlo.');
      }
    }
  }

  async deleteUser(uid: string) {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      await this.authService.deleteUser(uid);
      this.loadUsers();
    }
  }

  cancelEdit() {
    this.selectedUser = null;
  }
}
