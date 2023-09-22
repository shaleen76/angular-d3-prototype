import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { AppRoutingModule } from './app-routing.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PersonProfileComponent } from './person-profile/person-profile.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { ConnectionGraphComponent } from './connection-graph/connection-graph.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { AppService } from './app.service';
import { DashboardService } from './services/dashboard-service';
import { MatInputModule } from '@angular/material/input';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonProfileComponent,
    CompanyProfileComponent,
    ConnectionGraphComponent,
    DashboardComponent,
    MenuComponent
  ],
  exports: [MatMenuModule, FormsModule, MatFormFieldModule],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    // NgIconsModule.withIcons({ heroBriefcase }),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    FlexLayoutModule,
    MatButtonModule,
    MatGridListModule,
    MatListModule,
    OAuthModule.forRoot()
  ],
  providers: [AppService, DashboardService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }


