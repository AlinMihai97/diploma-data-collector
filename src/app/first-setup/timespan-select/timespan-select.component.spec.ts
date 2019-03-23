import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimespanSelectPage } from './timespan-select.page';

describe('TimespanSelectPage', () => {
  let component: TimespanSelectPage;
  let fixture: ComponentFixture<TimespanSelectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimespanSelectPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimespanSelectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
