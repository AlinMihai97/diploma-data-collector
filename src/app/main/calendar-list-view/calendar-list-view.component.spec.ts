import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarListViewPage } from './calendar-list-view.page';

describe('CalendarListViewPage', () => {
  let component: CalendarListViewPage;
  let fixture: ComponentFixture<CalendarListViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarListViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarListViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
