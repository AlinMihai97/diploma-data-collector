import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyApiPage } from './verify-api.page';

describe('VerifyApiPage', () => {
  let component: VerifyApiPage;
  let fixture: ComponentFixture<VerifyApiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyApiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyApiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
