import { Component, NgZone, ViewChild } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { CompanyService } from '../services/company-service';
import { Company } from '../models/company';
import { AppService } from '../app.service';
import { Person } from '../models/person';
import { DashboardService } from '../services/dashboard-service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent {

  @Output() displayPersonProfile = new EventEmitter<boolean>();


  companies = new Array<Company>;
  viewCompanies = new Array<Company>;
  leftActive: boolean = true;
  rightActive: boolean = true;
  index: number = 0;
  selectedIndex: number = -1;

  constructor(private companyService: CompanyService, private dashboardService: DashboardService, private ngZone: NgZone) { }

  showPersonProfile(selectedCompany: Company) {
    this.selectedIndex = selectedCompany.index;
    this.dashboardService.setPersonComponent();
    this.dashboardService.setActiveCompany(selectedCompany.name != null ? selectedCompany.name : '');
    this.dashboardService.setConnectionComponent(false);
    this.dashboardService.setSelectedPerson(new Person());
  }

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe((data: any) => {
      data?.result?.data_array.forEach((element: any, index: any) => {
        this.companies.push({
          index,
          id: element[0],
          name: element[1],
          score: element[2],
          firstIndustry: this.buildIndustry(element[3]),
          remainingIndustry: this.buildRemainingIndustry(element[3]),
          remainingIndustryTooltip: this.remaningTooltip(element[3]),
          industry: element[3],
          revenue: element[4],
          website: element[5],
          totalEmployees: element[6],
          location: element[7],
          fundingDateStage: element[8]
        });
      })
      this.viewCompanies = this.companies.slice(0, 3);
      this.index = this.viewCompanies.length - 1;
      this.rightActive = this.companies.length > 3 ? false : true;
    });
  }

  remaningTooltip(text: string[]): string {
    let tooltipText = '';
    if (text && text.length > 1) {
      text.shift();
      tooltipText = text.join("\n");
    }
    return tooltipText;
  }
  

  viewNextCards() {
    if (this.index < (this.companies.length - 1) && (this.index >= 0)) {
      this.index = this.viewCompanies[this.viewCompanies.length - 1].index + 1;
      this.viewCompanies.shift();
      let newCompany: any = this.companies.filter((row: Company) => row.index === this.index).pop();
      if (newCompany != null) {
        this.viewCompanies.push(newCompany);
      }
      this.leftActive = false;
      this.rightActive = !(this.index < (this.companies.length - 1));
    } else {
      this.rightActive = true;
    }
  }

  viewPrevCards() {
    if (this.index <= (this.companies.length - 1) && (this.index >= 0)) {
      this.index = this.viewCompanies[0].index - 1;
      if (this.index >= 0) {
        this.viewCompanies.pop();
        let newCompany: any = this.companies.filter((row: Company) => row.index === this.index).pop();
        if (newCompany != null) {
          this.viewCompanies.unshift(newCompany);
        }
        this.leftActive = (this.index == 0);
        this.rightActive = !(this.index < (this.companies.length - 1));
      }
      
    } else {
      this.leftActive = true;
    }
  }

  buildIndustry(data: string[]): string {
    if (data && data.length > 0) {
      return data[0];
    } 
    return '';
  }

  buildRemainingIndustry(data: string[]): string {
    if (data && data.length > 1) {
      return ' and ' + (data.length - 1) + ' more';
    }
    return '';
  }

  buildSubTitle(data: string, revenue: string): string {
    let subtitle = "•".concat("\t\t\t\t\t").concat(data);
    if (revenue != null) {
      subtitle = subtitle.concat("\t\t\t\t\t").concat("•").concat("Revenue: ").concat(revenue);
    }
    return subtitle;
    
  }
}
