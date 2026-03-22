import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyzerFormComponent } from './analyzer-form-component';

describe('AnalyzerFormComponent', () => {
  let component: AnalyzerFormComponent;
  let fixture: ComponentFixture<AnalyzerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyzerFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalyzerFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
