import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Products5Component } from './products5.component';

describe('Products5Component', () => {
  let component: Products5Component;
  let fixture: ComponentFixture<Products5Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Products5Component]
    });
    fixture = TestBed.createComponent(Products5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
