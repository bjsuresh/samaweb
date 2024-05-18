import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriansComponent } from './historians.component';

describe('HistoriansComponent', () => {
  let component: HistoriansComponent;
  let fixture: ComponentFixture<HistoriansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoriansComponent]
    });
    fixture = TestBed.createComponent(HistoriansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
