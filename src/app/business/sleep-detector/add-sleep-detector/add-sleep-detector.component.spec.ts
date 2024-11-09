import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSleepDetectorComponent } from './add-sleep-detector.component';

describe('AddSleepDetectorComponent', () => {
  let component: AddSleepDetectorComponent;
  let fixture: ComponentFixture<AddSleepDetectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSleepDetectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSleepDetectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
