import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteSimulatorComponent } from './site-simulator.component';

describe('SiteSimulatorComponent', () => {
  let component: SiteSimulatorComponent;
  let fixture: ComponentFixture<SiteSimulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteSimulatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
