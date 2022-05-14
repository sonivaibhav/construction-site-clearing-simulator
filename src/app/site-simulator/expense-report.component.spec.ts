import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExpenseReportComponent} from './expense-report.component';

describe('ExpenseReportComponent', () => {
  let component: ExpenseReportComponent;
  let fixture: ComponentFixture<ExpenseReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpenseReportComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ExpenseReportComponent', () => {
    expect(component).toBeTruthy();
  });
});
