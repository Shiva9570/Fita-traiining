import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private router: Router) {}

  onRegister() {
    if (!this.email || !this.password) {
      this.message = 'Please provide email and password.';
      return;
    }
    const raw = localStorage.getItem('registeredUsers');
    let users = raw ? JSON.parse(raw) : [];
    const exists = users.some((u: any) => u.email === this.email);
     if (exists) {
    this.message = 'Email already registered. Please login.';
    return;
  }


    const newUser = {
    name: this.name,
    email: this.email,
    password: this.password
  };

    users.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(users));
    this.router.navigate(['/login']);
  }
}
