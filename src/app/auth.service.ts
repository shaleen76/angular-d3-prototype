import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './sso.config';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /**
   *
   * @param router
   * @param oauthService
   */
  constructor(private router: Router, private oauthService: OAuthService) {
    this.oauthService.configure(authConfig);
  }

  public authenticationEventObservable: Subject<boolean> = new Subject<boolean>();

 /**
   *
   */
  public logout() {
    this.oauthService.logOut();
  }
  
  /**
   *
   */
  public isAuthenticated(): boolean {
    if (
      this.oauthService.hasValidAccessToken() &&
      this.oauthService.hasValidIdToken()
    ) {
      return true;
    } else {
      return false;
    }
  }

  public login() {
    this.oauthService
      .loadDiscoveryDocumentAndLogin()
      .then((result: boolean) => {
        console.log('result is ' + result);
        this.authenticationEventObservable.next(result);
      })
      .catch((error) => {
        console.log('eee', error);
        this.logout();
      });

    // Optional
    this.oauthService.setupAutomaticSilentRefresh();
  }
}