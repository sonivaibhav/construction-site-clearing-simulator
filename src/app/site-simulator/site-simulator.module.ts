import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SiteSimulatorComponent} from "./site-simulator.component";
import {SiteSimulatorRoutingModule} from "./site-simulator-routing.module";

@NgModule({
  imports: [
    CommonModule,
    SiteSimulatorRoutingModule
  ],
  declarations: [SiteSimulatorComponent]
})
export class SiteSimulatorModule {
}
