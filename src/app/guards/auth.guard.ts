import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {

  constructor(private router: Router) {}

  canActivateChild(): boolean {
    const currentUser = localStorage.getItem('currentUser');

    if (currentUser) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
