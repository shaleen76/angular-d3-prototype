import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../models/person';
 
@Injectable({
 providedIn: 'root'
})

export class PersonService {
 
 constructor(private http: HttpClient) { }

 public persons: Person[] = new Array<Person>;

  getPersons() {
      return this.http.get('../../../assets/mock-data/person.json');
  }
}