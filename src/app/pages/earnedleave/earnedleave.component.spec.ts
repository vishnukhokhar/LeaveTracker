import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarnedleaveComponent } from './earnedleave.component';

describe('EarnedleaveComponent', () => {
  let component: EarnedleaveComponent;
  let fixture: ComponentFixture<EarnedleaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EarnedleaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EarnedleaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
