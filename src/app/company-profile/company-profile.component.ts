import { Component, NgZone, ViewChild } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { CompanyService } from '../services/company-service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { map, pairwise, filter, throttleTime } from 'rxjs/operators';
import { timer } from 'rxjs';
import { Company } from '../models/company';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent {

  @Output() displayPersonProfile = new EventEmitter<boolean>();
  @ViewChild('scroller') scroller: CdkVirtualScrollViewport;

  companies = new Array<Company>;

  constructor(private companyService: CompanyService, private ngZone: NgZone) {}

  showPersonProfile() {
    this.displayPersonProfile.emit(true);
  }

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe(data => {
      this.companies = data;
    });
  }
}
