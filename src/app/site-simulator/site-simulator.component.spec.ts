import {MockNgRedux, NgReduxTestingModule} from '@angular-redux/store/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {SiteSimulatorComponent} from './site-simulator.component';

describe('SiteSimulatorComponent', () => {
  let component: SiteSimulatorComponent;
  let fixture: ComponentFixture<SiteSimulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SiteSimulatorComponent],
      imports: [RouterTestingModule, NgReduxTestingModule],
      providers: [MockNgRedux],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create SiteSimulatorComponent', () => {
    expect(component).toBeTruthy();
  });
});
