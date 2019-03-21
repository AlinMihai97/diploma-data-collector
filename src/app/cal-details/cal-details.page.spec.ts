import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalDetailsPage } from './cal-details.page';

describe('CalDetailsPage', () => {
  let component: CalDetailsPage;
  let fixture: ComponentFixture<CalDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalDetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
