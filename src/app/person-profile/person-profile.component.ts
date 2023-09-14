import { Component, NgZone, OnDestroy } from '@angular/core';
import { Person } from '../models/person';
import { PersonService } from '../services/person-service';
import { AppService } from '../app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-person-profile',
  templateUrl: './person-profile.component.html',
  styleUrls: ['./person-profile.component.scss']
})
export class PersonProfileComponent implements OnDestroy {
  persons = new Array<Person>;
  viewPersons = new Array<Person>;
  leftPersonActive: boolean = true;
  rightPersonActive: boolean = true;
  index: number = 0;
  selectedCompany: string = '';
  _subsc: Subscription;
  rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
  selectedPersonIndex: number = -1;

  constructor(private personService: PersonService, private appService: AppService, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this._subsc = this.appService.selectedPersonForCompany.subscribe(viewPersons => this.viewPersons = viewPersons);
    if (this.viewPersons.length > 0) {
      this.viewPersons = this.persons.slice(0, 4);
      this.index = this.viewPersons.length - 1;
      this.rightPersonActive = this.persons.length > 4 ? false : true;
    }
  }

  showConnections(selectedPerson: Person) {
    this.selectedPersonIndex = selectedPerson.index;
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

  ngOnDestroy(): void {
    this._subsc.unsubscribe();
  }
}
