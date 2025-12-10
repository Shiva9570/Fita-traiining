import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet, NavigationEnd } from '@angular/router';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any = null;
  loginDate: string = '';
  // Example variable to pass to child
  userStatus: string = 'Active';
  lastLogin: string = '';
  isChildRoute: boolean = false;

  constructor(private router: Router, private userService: UserService) {
    const raw = localStorage.getItem('currentUser');
    try {
      this.user = raw ? JSON.parse(raw) : null;
      // Set login date to today
      this.loginDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      this.lastLogin = new Date().toLocaleTimeString();
      // Pass login date to service so child component can access it
      this.userService.setLoginDate(this.loginDate);
    } catch (e) {
      this.user = null;
    }
  }

  ngOnInit() {
    // Check if child route is active
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.isChildRoute = this.router.url.includes('/home/') && 
                           !this.router.url.endsWith('/home');
      });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
