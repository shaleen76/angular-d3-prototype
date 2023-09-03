import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../models/company';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class CompanyService {

    constructor(private http: HttpClient) { }

    getCompanies(): Observable<Company[]> {
        return this.http.get<Company[]>('../../../assets/mock-data/company.json');
    }
}