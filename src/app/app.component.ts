import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  isMenuRequired = false;
  isAdmin = false;
  constructor(private router: Router, private service: AuthService) {

  }
  ngDoCheck(): void {
    let currentUrl = this.router.url;
    if (currentUrl === '/login' || currentUrl === '/register') {
      this.isMenuRequired = false;
    } else {
      this.isMenuRequired = true;
    }

    if (this.service.GetUserRole() === 'admin') {
      this.isAdmin = true
    } else {
      this.isAdmin = false;
    }
  }
  title = 'base-role-auth';
}
