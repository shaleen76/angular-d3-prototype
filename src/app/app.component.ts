import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from './app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  viewPerson: boolean = false;
  viewConnection: boolean = false;
  _sub: Subscription;
  _subs: Subscription;

  constructor(private appService: AppService) {}
  
  ngOnInit(){
    this._sub = this.appService.showPersonComponent.subscribe(showPersonState => this.viewPerson = showPersonState);
    this._subs = this.appService.showConnectionComponent.subscribe(showConnectionState => this.viewConnection = showConnectionState);
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
    this._subs.unsubscribe()
}
}
