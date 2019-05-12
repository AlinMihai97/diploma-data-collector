import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarListEntryPage } from './calendar-list-entry.page';

describe('CalendarListEntryPage', () => {
  let component: CalendarListEntryPage;
  let fixture: ComponentFixture<CalendarListEntryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarListEntryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarListEntryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
