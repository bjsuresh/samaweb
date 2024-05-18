import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalisationComponent } from './digitalisation.component';

describe('DigitalisationComponent', () => {
  let component: DigitalisationComponent;
  let fixture: ComponentFixture<DigitalisationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DigitalisationComponent]
    });
    fixture = TestBed.createComponent(DigitalisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
