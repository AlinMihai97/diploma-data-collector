import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstSetupPage } from './first-setup.page';

describe('FirstSetupPage', () => {
  let component: FirstSetupPage;
  let fixture: ComponentFixture<FirstSetupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstSetupPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstSetupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
