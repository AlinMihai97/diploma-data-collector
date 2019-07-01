import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthViewPage } from './month-view.page';

describe('MonthViewPage', () => {
  let component: MonthViewPage;
  let fixture: ComponentFixture<MonthViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
