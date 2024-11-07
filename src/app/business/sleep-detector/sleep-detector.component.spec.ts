import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepDetectorComponent } from './sleep-detector.component';

describe('SleepDetectorComponent', () => {
  let component: SleepDetectorComponent;
  let fixture: ComponentFixture<SleepDetectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SleepDetectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SleepDetectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
