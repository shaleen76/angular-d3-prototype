import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
 providedIn: 'root'
})

export class PersonService {
 
 constructor(private http: HttpClient) { }
 
 getPersons(): Observable<any> {
    console.log('ppp');
   return this.http.get('../../../assets/mock-data/person.json');
 }
}