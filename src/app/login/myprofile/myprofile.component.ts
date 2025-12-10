import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-myprofile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './myprofile.component.html',
  styleUrl: './myprofile.component.css'
})
export class MyprofileComponent {
  user: any = null;
  loginDate: string = '';
  
  // Input properties from parent component
  @Input() userStatus: string = '';
  @Input() lastLogin: string = '';

  constructor(private userService: UserService) {
    const raw = localStorage.getItem('currentUser');
    try {
      this.user = raw ? JSON.parse(raw) : null;
      // Get login date from service (set by parent HomeComponent)
      this.loginDate = this.userService.getLoginDate();
    } catch (e) {
      this.user = null;
    }
  }
}
