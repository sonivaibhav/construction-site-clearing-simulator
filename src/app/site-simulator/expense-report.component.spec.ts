import {MockNgRedux, NgReduxTestingModule} from '@angular-redux/store/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {ToastrModule, ToastrService} from 'ngx-toastr';

import {ExpenseReportComponent} from './expense-report.component';

describe('ExpenseReportComponent', () => {
  let component: ExpenseReportComponent;
  let fixture: ComponentFixture<ExpenseReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ToastrModule.forRoot(), NgReduxTestingModule, NoopAnimationsModule],
      declarations: [ExpenseReportComponent],
      providers: [ToastrService, MockNgRedux]
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
