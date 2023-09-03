import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionGraphComponent } from './connection-graph.component';

describe('ConnectionGraphComponent', () => {
  let component: ConnectionGraphComponent;
  let fixture: ComponentFixture<ConnectionGraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectionGraphComponent]
    });
    fixture = TestBed.createComponent(ConnectionGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
