import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DashboardService } from '../services/dashboard-service';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './../sso.config';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  viewPerson: boolean = false;
  viewConnection: boolean = false;
  viewConnectionEmpty: boolean = false;
  _sub: Subscription;
  _subs: Subscription;
  _subscr: Subscription;

  constructor(private dashboardService: DashboardService, private oauthService: AuthService) {

  }

  configureSingleSignOn() {
    //this.oauthService.configure(authConfig);
  }
  
  ngOnInit(){
    this._sub = this.dashboardService.showPersonComponent.subscribe(showPersonState => this.viewPerson = showPersonState);
    this._subs = this.dashboardService.showConnectionComponent.subscribe(showConnectionState => this.viewConnection = showConnectionState);
    this._subscr = this.dashboardService.viewSelectedPerson.subscribe(viewSelectedPerson => this.viewConnectionEmpty = viewSelectedPerson);
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
    this._subs.unsubscribe()
    this._subscr.unsubscribe();
}
}
