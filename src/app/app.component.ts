import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from './sso.config';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isAuthenticated$: Observable<boolean>;
  isDoneLoading$: Observable<boolean>;
  canActivateProtectedRoutes$: Observable<boolean>;
  public isAuthenticated = false;


  constructor(private authService: AuthService) {
    this.authService.authenticationEventObservable.subscribe((event) => {
      this.isAuthenticated = event;
    });
  }

  login() { this.authService.login(); }
  logout() { this.authService.logout(); }
  // refresh() { this.authService.refresh(); }
  reload() { window.location.reload(); }
  clearStorage() { localStorage.clear(); }
  // logoutExternally() {
  //   window.open(this.authService.logoutUrl);
  // }
  // get hasValidToken() { return this.authService.hasValidToken(); }
  // get accessToken() { return this.authService.accessToken; }
  // get refreshToken() { return this.authService.refreshToken; }
  // get identityClaims() { return this.authService.identityClaims; }
  // get idToken() { return this.authService.idToken; }
}
