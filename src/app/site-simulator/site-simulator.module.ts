import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SiteSimulatorComponent} from "./site-simulator.component";
import {SiteSimulatorRoutingModule} from "./site-simulator-routing.module";
import {VehicleControlsComponent} from './vehicle-controls.component';

@NgModule({
  imports: [
    CommonModule,
    SiteSimulatorRoutingModule
  ],
  declarations: [
    SiteSimulatorComponent,
    VehicleControlsComponent
  ]
})
export class SiteSimulatorModule {
}
