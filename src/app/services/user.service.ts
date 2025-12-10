import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loginDate: string = '';

  setLoginDate(date: string) {
    this.loginDate = date;
  }

  getLoginDate(): string {
    return this.loginDate;
  }
}
