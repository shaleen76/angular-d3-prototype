import { Component, NgZone } from '@angular/core';
import { Person } from '../models/person';
import { PersonService } from '../services/person-service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-person-profile',
  templateUrl: './person-profile.component.html',
  styleUrls: ['./person-profile.component.scss']
})
export class PersonProfileComponent {
  persons = new Array<Person>;
  viewPersons = new Array<Person>;
  leftPersonActive: boolean = true;
  rightPersonActive: boolean = true;
  index: number = 0;

  constructor(private personService: PersonService, private appService: AppService, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.personService.getPersons().subscribe((data: any) => {
      data?.result?.data_array.forEach((element: any, index: any) => {
        this.persons.push({
          index,
          id: element[0],
          name: element[1],
          company: element[2],
          designation: element[3],
          linkedin: element[4],
          location: element[5]
        });
      })
      this.viewPersons = this.persons.slice(0, 4);
      this.index = this.viewPersons.length - 1;
      this.rightPersonActive = this.persons.length > 4 ? false : true;
    });
  }

  showConnections() {
    this.appService.setConnectionComponent(true);
  }

  viewNextPersonCards() {
    if (this.index < (this.persons.length - 1) && (this.index >= 0)) {
      this.index = this.viewPersons[this.viewPersons.length - 1].index + 1;
      this.viewPersons.shift();
      let newCompany: any = this.persons.filter((row: Person) => row.index === this.index).pop();
      if (newCompany != null) {
        this.viewPersons.push(newCompany);
      }
      this.leftPersonActive = false;
      this.rightPersonActive = !(this.index < (this.persons.length - 1));
    } else {
      this.rightPersonActive = true;
    }
  }

  viewPreviousPersonCards() {
    if (this.index <= (this.persons.length - 1) && (this.index >= 0)) {
      this.index = this.viewPersons[0].index - 1;
      if (this.index >= 0) {
        this.viewPersons.pop();
        let newCompany: any = this.persons.filter((row: Person) => row.index === this.index).pop();
        if (newCompany != null) {
          this.viewPersons.unshift(newCompany);
        }
        this.leftPersonActive = (this.index == 0);
        this.rightPersonActive = !(this.index < (this.persons.length - 1));
      }
      
    } else {
      this.leftPersonActive = true;
    }
  }
}
