import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  isAuthenticated$: Observable<boolean>;
  isAuthenticated: boolean=false;

  constructor(private authService: AuthService) {
    this.authService.authenticationEventObservable.subscribe((event) => {
      this.isAuthenticated = event;
    });
  }

  login() {
 this.authService.login();
}
  logout() {
 this.authService.logout();
}

  // get email(): string {
  //   return this.authService.identityClaims
  //   ? (this.authService.identityClaims as any)['email']
  //   : '-';
  // }
}
