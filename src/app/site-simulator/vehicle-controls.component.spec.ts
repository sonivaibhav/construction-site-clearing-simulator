import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VehicleControlsComponent} from './vehicle-controls.component';

describe('VehicleControlsComponent', () => {
  let component: VehicleControlsComponent;
  let fixture: ComponentFixture<VehicleControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehicleControlsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create VehicleControlsComponent', () => {
    expect(component).toBeTruthy();
  });
});
