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

    public companies: Company[] = new Array<Company>;

    getCompanies() {
        return this.http.get('../../../assets/mock-data/company.json');
    }
}