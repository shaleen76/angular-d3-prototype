import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Connection } from '../models/connection';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class ConnectionService {

    constructor(private http: HttpClient) { }

    public connections: Connection[] = new Array<Connection>;

    getConnections() {
        return this.http.get('../../../assets/mock-data/connections.json');
    }
}