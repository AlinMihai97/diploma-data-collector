import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventViewPage } from './event-view.page';

describe('EventViewPage', () => {
  let component: EventViewPage;
  let fixture: ComponentFixture<EventViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
