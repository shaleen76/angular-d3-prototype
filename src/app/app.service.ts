import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    public showPersonComponent: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public showConnectionComponent: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(private http: HttpClient) { }

    setPersonComponent() {
        this.showPersonComponent.next(true);
    } 
    
    setConnectionComponent(data: boolean) {
        this.showConnectionComponent.next(data);
    }
}