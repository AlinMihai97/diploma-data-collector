import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorEventPage } from './error-event.page';

describe('ErrorEventPage', () => {
  let component: ErrorEventPage;
  let fixture: ComponentFixture<ErrorEventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorEventPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
