import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSelectPage } from './email-select.page';

describe('EmailSelectPage', () => {
  let component: EmailSelectPage;
  let fixture: ComponentFixture<EmailSelectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailSelectPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailSelectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
