import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-loginpage',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.css',
})
export class LoginpageComponent {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private router: Router) {}

  onLogin() {
    this.error = '';

    // Step 1: Get registered users array
    const raw = localStorage.getItem('registeredUsers');
    if (!raw) {
      this.error = 'No registered users found. Please register first.';
      return;
    }

    let newUsers = [];
    try {
      newUsers = JSON.parse(raw);
    } catch (e) {
      this.error = 'Stored data corrupted. Please register again.';
      return;
    }

    // Step 2: Find user with matching email & password
    const found = newUsers.find(
      (u: any) => u.email === this.email && u.password === this.password
    );

    // Step 3: Validate
    if (found) {
      console.log('Login successful', found);
      // Store current logged-in user
      localStorage.setItem('currentUser', JSON.stringify(found));
      this.router.navigate(['/home']);
    } else {
      this.error = 'Invalid email or password.';
    }
  }
}
