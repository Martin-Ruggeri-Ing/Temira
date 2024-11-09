import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailStatementComponent } from './detail-statement.component';

describe('DetailStatementComponent', () => {
  let component: DetailStatementComponent;
  let fixture: ComponentFixture<DetailStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailStatementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
