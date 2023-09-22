import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Person } from './../models/person';
import { PersonService } from './../services/person-service';
import { ConnectionService } from './../services/connection-service';
import { Connection } from './../models/connection';
import { PersonNode } from './../models/personNode';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    public showPersonComponent: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public showConnectionComponent: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public selectedCompany: BehaviorSubject<string> = new BehaviorSubject('');
    public selectedPersonForCompany = new BehaviorSubject<Array<Person>>([]);
    public selectedPerson: BehaviorSubject<Person> = new BehaviorSubject(new Person());
    public viewSelectedPerson: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public viewSelectedConnection: BehaviorSubject<Connection> = new BehaviorSubject(new Connection());
    rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
    companies: any;

    constructor(private http: HttpClient, private personService: PersonService, private connectionService: ConnectionService) { }

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
              this.selectedPerson.next(new Person());
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

    getNode(uid: string, personNodes: PersonNode[]): PersonNode {
      let filteredPerson: PersonNode[] =  personNodes.filter((nodedata: PersonNode) => nodedata.uid === uid);
      return filteredPerson ? filteredPerson[0] : new PersonNode();
    }

    uniqueCompanies(personOrg: string): string {
      this.companies.add(personOrg);
      return personOrg;
    }

    generateGroup(company: string): number {
      let arr = Array.from(this.companies);
      return arr.indexOf(company);
    }

    setSelectedPerson(selectedPerson: Person) {
      this.selectedPerson.next(selectedPerson);
      this.connectionService.getConnections().subscribe((data: any) => {
        this.companies = new Set();
        if (data) {
          let dataNodes: any = data.nodes;
          let dataedges: any = data.edges;
          let connection: Connection = new Connection();
          if (dataNodes && dataNodes.length > 0) {
            dataNodes.forEach((person: any, position: any) => {
              connection.nodes.push({
                index: position,
                uid: person.uid,  
                name: person.name,
                company: this.uniqueCompanies(person.company),
                email: person.email,
                group: this.generateGroup(person.company)
              });
            });
            
          }
          if (dataedges && dataedges.length > 0) {
            dataedges.forEach((edge: any, post: any) => {
              connection.edges.push(
                {
                  index: post,
                  source: this.getNode(edge.source, connection.nodes),
                  target: this.getNode(edge.target, connection.nodes),
                  weight: edge?.weight,
                  relation: edge?.relation
                }
              );
            });
          }
          this.viewSelectedConnection.next(connection);
        }
      });
    }
}