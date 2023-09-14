import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Person } from './models/person';
import { PersonService } from './services/person-service';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    public showPersonComponent: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public showConnectionComponent: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public selectedCompany: BehaviorSubject<string> = new BehaviorSubject('');
    public selectedPersonForCompany = new BehaviorSubject<Array<Person>>([]);
    rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');

    constructor(private http: HttpClient, private personService: PersonService) { }

    setActiveCompany(companyName: string) {
        this.selectedCompany.next(companyName != null ? companyName : '');
        let persons = new Array<Person>();
        this.personService.getPersons().subscribe((data: any) => {
            data?.result?.data_array.forEach((element: any, index: any) => {
                if (element[2].toUpperCase() === companyName.toUpperCase()) {
                  persons.push({
                    index,
                    id: element[0],
                    name: element[1],
                    company: element[2],
                    designation: element[3],
                    linkedin: element[4],
                    location: element[5],
                    titleCase: this.buildTitleCase(element[1])
                  });
                }
              });
              this.selectedPersonForCompany.next(persons);
        });
    } 

    buildTitleCase(name: string): string {
        let initials = [...name.matchAll(this.rgx)] || [];
        let splitName = name.split("\\s");
        let firstname = splitName && splitName.length > 0 ? splitName[0] : '';
        let lastname = splitName && splitName.length > 2 ? splitName[1] : '';
        let caseinitials = (
          (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
        ).toUpperCase();
        return caseinitials;
      }

    setPersonComponent() {
        this.showPersonComponent.next(true);
    } 
    
    setConnectionComponent(data: boolean) {
        this.showConnectionComponent.next(data);
    }
}