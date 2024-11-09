import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSleepDetectorComponent } from './detail-sleep-detector.component';

describe('DetailSleepDetectorComponent', () => {
  let component: DetailSleepDetectorComponent;
  let fixture: ComponentFixture<DetailSleepDetectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailSleepDetectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailSleepDetectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
