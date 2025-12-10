import { Component, OnInit } from '@angular/core';
import {
  RouterOutlet,
  RouterLink,
  Router,
  NavigationEnd,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'fita';
  isLoggedIn: boolean = false;
  currentRoute: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkLoginStatus();
    // Initialize current route immediately, handle the case where it might be just '/'
    this.currentRoute = this.router.url === '/' ? '/' : this.router.url;

    // Listen to route changes to update login status and current route
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.checkLoginStatus();
        // Use the final URL after redirects, and normalize root to '/'
        this.currentRoute =
          event.urlAfterRedirects === '/' ? '/' : event.urlAfterRedirects;
        console.log('Current route:', this.currentRoute); // Debug log
      });
  }

  checkLoginStatus() {
    const user = localStorage.getItem('currentUser');
    this.isLoggedIn = !!user;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  /**
   * Checks if a given route path should be marked as active.
   * Handles exact matches and sub-routes, and specifically addresses the Home link.
   * @param route The base route path (e.g., '/home', '/products').
   * @returns boolean
   */
  isActive(route: string): boolean {
    const currentPath = this.currentRoute.split('?')[0]; // Ignore query parameters

    // 1. Special handling for the Home route
    if (route === '/home') {
      // Home is active only if the path is exactly '/home', or the root path '/'
      return currentPath === '/home' || currentPath === '/';
    }
    
    // 2. Handling for all other routes
    // Check for exact match OR if the current path starts with the route followed by a separator (for sub-routes)
    return currentPath === route || currentPath.startsWith(route + '/');
  }
}
